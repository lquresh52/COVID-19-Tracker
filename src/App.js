import React from 'react';


import {Cards , Chart , CountryPicker } from './components';
import styles from './App.module.css';
import { fetchData } from './api';

import coronaImg from './images/image.png'


class App extends React.Component{

    state = {
        data : {},
        country: '',
    }

    async componentDidMount(){
        const fetchedData = await fetchData();
        this.setState({ data : fetchedData });
    }


    handleCountryChange = async (country) => {
    
        const fetchedData = await fetchData(country);
    
        // set the state
        this.setState({data: fetchedData ,country:country});
    }

    render() {
        const { data,country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImg} alt='COVID-19'/>
                <Cards data= {data} />
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
                <div>
                    <br></br>
                    <br></br>
                </div>
                <div className={styles.credit_divi} >
                    <h4 className={styles.credits}>Designed and Developed By : Quresh Lakdawala </h4>
                </div>
            </div>

        );
    }
}

export default App;