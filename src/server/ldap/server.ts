import * as ldap from 'ldapjs';
import { User } from '../../lib/model';
import { findUserByAttr } from '../database';

/**
 *                            !!!WARNING!!!
 * !!!Node server may crash after LDAP server shutdown during its work!!!
 *        !!!I don't know why it happens. Will be fixed later.!!!
 *
 * Use 'npm run ldap_dev/ldap_start' to run server in dev/production mode
 */

let BASE: string = 'o=eduxored';

let server: ldap.Server = ldap.createServer(undefined);

/**
 * Any user may search after and compare, only binded as root has full power.
 */
function authorize(req: any, res: any, next: ldap.Server.NextFunction) {
  let isSearch: boolean = (req instanceof ldap.SearchRequest);
  let isCompare: boolean = (req instanceof ldap.CompareRequest);
  if (!req.connection.ldap.bindDN.equals('cn=root') && !isSearch && !isCompare) {
    return next(new ldap.InsufficientAccessRightsError('Insufficient access rights'));
  }

  return next();
}

/**
 * Binds common users.
 */
server.compare(BASE, [authorize],
  async (req: ldap.CompareRequest, res: any, next: ldap.Server.NextFunction) => {
    let dn: string = req.dn.toString();
    let login: string = dn.split(', ')[0].split('=')[1];
    let user: User = await findUserByAttr('login', login);
    if (!user) {
      res.end(false);
      return next(new ldap.NoSuchObjectError(dn));
    }

    if (!user[req.attribute]) {
      res.end(false);
      return next(new ldap.NoSuchAttributeError(req.attribute));
    }

    let matches: boolean = false;
    let val = user[req.attribute];
    if (val === req.value) {
      matches = true;
    }

    res.end(matches);
    return next();
  });

server.search(BASE, [authorize],
  async (req: ldap.SearchRequest, res: ldap.SearchResponse, next: ldap.Server.NextFunction) => {
    const dn: string = req.dn.toString();
    const name = req.filter.toString().split('=')[0].split('(')[1];
    const value = req.filter.toString().split('=')[1].split(')')[0];
    let user: any = await findUserByAttr(name, value);
    if (!user) {
      return next(new ldap.NoSuchObjectError(dn));
    }
    res.send({
      dn: dn,
      attributes: user.dataValues,
    });

    return next();
  });



///--- Fire it up

server.listen(1389, () => {
  console.log('LDAP server up at: %s', server.url);
});
