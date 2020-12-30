import React from 'react';
import "./Table.css";
import { dotStat } from './util';

function Table({countries}) {
  return (
    <div className="table">
      {countries.map(({country,cases})=>(
        <tr>
          <td>{country}</td>
          <td>
            <strong>{dotStat(cases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  )

}
export default Table;