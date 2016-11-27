import * as _ from 'lodash';
import * as React from 'react';

import Row from '../common/Row';
import Cell from '../common/Cell';
import { Team } from '../../../../lib/model';

interface IGridProps {
    deleteTeam: (id: string) => void;
    openEditModal: (id: string) => void;
    data: any[];
}

interface IGridState {
    teams: Team[];
    headers: string[];
}

const headers = ['id', 'createAt', 'createBy', 'updateAt', 'updateBy', 'name', 'avatar', 'description'];

export default class Grid extends React.Component<IGridProps, IGridState> {
    constructor(props) {
        super(props);
    }

    handleDelete = (e: MouseEvent) => {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.deleteTeam(entityId);
    }

    handleEdit = (e: MouseEvent) => {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.openEditModal(entityId);
    }

    render() {
        const teamsRows = _.map(this.props.data, team => {
            const data = _.map(headers, propertyName => team[propertyName]);
            return (
                <Row key={team.id} id={team.id} rowData={data} onDelete={this.handleDelete} onEdit={this.handleEdit} />
            );
        });
        return (
            <div id='teams-grid'>
                <section className='top-row'>
                    {headers.map((cellData, i) => <Cell key={i} data={cellData} />)}
                </section>
                <section className='teams-rows'>
                    {teamsRows}
                </section>
            </div>
        );
    }
}