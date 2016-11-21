import * as React from 'react';

import Row from './Row';
import Cell from './Cell';
import { Team } from '../../../../lib/model';

interface IGridProps {
    deleteTeam: (id: string) => void;
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

        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete(e: MouseEvent) {
        let target: HTMLButtonElement = e.target as HTMLButtonElement;
        let entityId = target.parentElement.id;
        this.props.deleteTeam(entityId);
    }

    render() {
        let teams = this.props.data;
        let teamsRows = [];
        teams.forEach((team, i) => {
            let data = [];
            headers.forEach((propertyName) => {
                data.push(team[propertyName]);
            });
            teamsRows.push(
                <Row key={i} id={team.id} rowData={data} onDelete={this.handleDelete} />
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