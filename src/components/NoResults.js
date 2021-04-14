import React from 'react';
import HulkUngry from '../images/hulk_800_1.gif'
function NoResults(props) {
    return (
        <div className="no-results">
            <h2>Nenhum Resultado encontrado =(</h2>
            <img src={HulkUngry}/>
        </div>
    );
}

export default NoResults;