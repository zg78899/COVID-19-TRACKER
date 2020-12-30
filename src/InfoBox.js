import { Card,CardContent,Typography } from '@material-ui/core';
import React from 'react';
import "./InfoBox.css";
import { dotStat, prettyPrintStat } from './util';
import {LocalHospital} from '@styled-icons/material-sharp/LocalHospital'
import {Coronavirus} from '@styled-icons/material-twotone/Coronavirus'
import {SmileWink} from '@styled-icons/fa-solid/SmileWink';




function InfoBox({title,cases,total,isRed,active,...props}) {
  // console.log('Active',active);
  return (
    <Card onClick={props.onClick} 
    className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red' }`}>
      <CardContent>
        {/* Title i.e. CoronaVirus */}
        <Typography className="infoBox__title"
         color="textSecondary">
           {title === 'Coronavirus cases'? <Coronavirus className="icon icon-1"/> :
           title === 'Recovery' ? <SmileWink className="icon icon-2"/> : <LocalHospital className="icon icon-3"/>}
           {title}
        </Typography>
        {/* +120k Number of cases */}
        <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`} >
          {prettyPrintStat(cases)}
        </h2>
        <span>({dotStat(cases)}) - today</span>
        
        {/* 1.2M Total */}
        <Typography 
        className="infoBox__total"
         color="textSecondary">
          <strong>{total}</strong> total
        </Typography>
        
      </CardContent>
    </Card>
  )

}
export default InfoBox;