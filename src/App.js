import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table';
import { dotStat, prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";
import numeral from 'numeral';


function App() {
  const [countries,setCountries] = useState([]);
  const [country ,setCountry] = useState('worldwide');
  const [countryInfo,setCountryInfo] = useState({});
  const [tableData,setTableData] = useState([]);
  
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries,setMapCountries] = useState([]);
  const [casesType,setCasesType] = useState("cases");


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
          let sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data); // 나라들의 정보를 모두 가져와서 Map에서 circle을 그려준다.
          setCountries(countries);
        });
    };

    getCountriesData();
  }, []);
   
  const onCountryChange = async (e) =>{
     const countryCode = e.target.value;

     console.log('Country Code',countryCode);
     

    const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all':
    `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url).then(response=> response.json())
    .then(data =>{
      setCountry(countryCode);
      //all of tjhe data from contry
      setCountryInfo(data);
      setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
      setMapZoom(4);
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
       <FormControl className="app__dropdown">
         <Select
         onChange={onCountryChange}
         variant="outlined"
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
        isRed
        active={casesType === 'cases'}
        onClick={e=>setCasesType('cases')}
        title="Coronavirus cases"
        total={dotStat(countryInfo.cases)}
        cases={(countryInfo.todayCases)}
        />
        <InfoBox
        active={casesType === 'recovered'}
        onClick={e=>setCasesType('recovered')}
        title="Recovery"
        total={dotStat(countryInfo.recovered)}
        cases={(countryInfo.todayRecovered)}
        />
        <InfoBox
        isRed
        active={casesType === 'deaths'}
        onClick={e=>setCasesType('deaths')}
        title="Deaths"
        total={dotStat(countryInfo.deaths)}
        cases={(countryInfo.todayDeaths)}
        />
      </div>
      <Map
      casesType={casesType}
      countries={mapCountries}
      center={mapCenter}
      zoom={mapZoom}/>
      </div>

      <Card className="app__right">
        <sCardContent>
          <h3>Live Cases by Country</h3>
              <Table countries={tableData}/>
              <h3>Worldwide new {casesType}</h3>
              <LineGraph casesType={casesType} />
              {/* Graph */}
        </sCardContent>
      </Card>

    </div>
  );
}

export default App;
