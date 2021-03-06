import * as ORM from "sequelize";
import {makeEntityFn} from './common';
import {Calendar} from "../../lib/model";

export default makeEntityFn<Calendar>('calendar', {
  name: ORM.STRING,
  type: ORM.STRING(64), // TODO enum type
  description: ORM.STRING(512),
});
