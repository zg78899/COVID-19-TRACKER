import React from 'react';
import "./Table.css";
import { dotStat } from './util';

function Table({countries}) {
  return (
    <div className="table">
      {countries.map((country)=>(
        <tr>
          <td >
          <img src={country.countryInfo.flag} alt="country-flag"/>
            {country.country}
           {/* {console.log('Info',country)} */}
          </td>
          <td>
            <strong>{dotStat(country.cases)}</strong>
          </td>
        </tr>
      ))}
    </div>
  )

}
export default Table;