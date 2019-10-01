import React, { useContext } from 'react';
import PokemonContext from '../context/PokemonContext';
import Table from 'react-bootstrap/Table';

const StatsDisplay = (props) => {
    const ctx = useContext(PokemonContext);

    const baseStats = ctx.stats.map((stat,index)=>{
		return ({
		name:stat.stat.name, 
		base: stat.base_stat, 
		effort: stat.effort,
		url:stat.stat.url,
		});
    });
    const statRows = baseStats.map((stat, index) =>{
        return(
            <tr key={stat.url}>
                <th>{stat.name}</th>
                <td>{stat.base}</td>
                <td>{stat.effort}</td>
            </tr>
        )
    })

    return (
        <>
            Pokemon Stats
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Base Stat Value</th>
                        <th>Base Effort Value</th>
                    </tr>
                </thead>
                <tbody>
                    {statRows}
                </tbody>
            </Table>
            <br/>
        </>
    );
}

export default StatsDisplay;