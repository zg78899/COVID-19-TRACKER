import { Card, CardContent, FormControl, MenuItem, Select, Table } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import Map from './Map';


function App() {
  const [countries,setCountries] = useState([]);
  const [country ,setCountry] = useState('worldwide');
  const [countryInfo,setCountryInfo] = useState({});


  useEffect(()=>{
    fetch('https://disease.sh/v3/covid-19/all')
    .then((response)=>response.json())
    .then((data)=>{
      setCountryInfo(data)
    })

  },[]);

  useEffect(() => {
    const getCountriesData = async () => {
      fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);
   
  const onCountryChange =async  (e)=>{
     const countryCode = e.target.value;

     console.log('Country Code',countryCode);
     

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then(response=> response.json())
    .then(data =>{
      setCountry(countryCode);
      //all of tjhe data from contry
      setCountryInfo(data);
    })
      //https://disease.sh/v3/covid-19/all
     //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE];
    
   }

   console.log('CountryInfo',countryInfo);

  

  return (
    <div className="app">
    <div className="app__left">
      <div className="app__header">
      <h1>Covid-19 Tracker</h1>
       <FormControl className="app_dropdown">
         <Select
         onChange={onCountryChange}
         varient="outlined"
         value={country}
         >
           <MenuItem value="worldwide">WorldWide</MenuItem>
           {countries.map((country)=>(
             <MenuItem
              value={country.value} >
                {country.name}</MenuItem>
           ))}
         </Select>
       </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox
        title="Coronavirus cases"
        total={countryInfo.cases}
        cases={countryInfo.todayCases}
        />
        <InfoBox
        title="Recovery"
        total={countryInfo.recovered}
        cases={countryInfo.todayRecovered}
        />
        <InfoBox
        title="Deaths"
        total={countryInfo.deaths}
        cases={countryInfo.todayDeaths}
        />
      </div>
      <Map/>
      </div>

      <Card className="app__right">
        <sCardContent>
          <h3>Live Cases by Country</h3>
              <Table countries={tableData}/>
              <h3>Worldwide new cases</h3>
              {/* Graph */}
        </sCardContent>
      </Card>

    </div>
  );
}

export default App;
