import React from 'react';
import "./Table.css";
import { dotStat } from './util';
import { v4 as uuidv4 } from 'uuid';

function Table({countries}) {
  return (
    <div className="table">
    <table className="table-container">
      <tbody>
      {countries.map((country)=>(
        <tr key={uuidv4()}>
          <td >
          <img src={country.countryInfo.flag} alt="country-flag"/>
            {country.country}
          </td>
          <td>
            <strong>{dotStat(country.cases)}</strong>
          </td>
        </tr>
      ))}
      </tbody>
      </table>
    </div>
  )

}
export default Table;