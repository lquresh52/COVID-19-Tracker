import React, {useEffect,useState} from 'react';
import {fetchDailyData} from '../../api';
import {Line , Bar} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed,recovered,deaths} , country}) => {

    const [dailyData , setDailyData] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            setDailyData(await fetchDailyData());
        }

        // console.log(dailyData);

        fetchAPI();
    }, [] );

    const lineChart = (
        dailyData.length
        ? (
            <Line
            data={{
                labels:dailyData.map(({date})=> date),
                datasets: [{
                    data: dailyData.map(({confirmed})=> confirmed),
                    label: 'Infected',
                    borderColor: 'rgb(255, 0, 0 , 0.5)',
                    backgroundColor: 'rgb(255, 0, 0 , 0.5)',
                    fill: false,
                } , {
                    data: dailyData.map(({deaths})=> deaths),
                    label: 'Deaths',
                    borderColor: 'rgba(103, 100, 100, 0.85)',
                    backgroundColor: 'gray', 
                    fill: true,
                }],
            }}
            />) : null
    );


    const barChart = (
        confirmed
        ? (
            <Bar
            data={{
                labels: ['Infeted', 'Recovered','Deaths'],
                datasets: [{
                    label: 'People',
                    backgroundColor: ['rgb(255, 0, 0 , 0.5)','rgb(0, 255, 0 , 0.5)','rgba(103, 100, 100, 0.85'],
                    data: [confirmed.value,recovered.value,deaths.value],
                }]
            }}
            options={{
                legend:{ display: false},
                title: {display: true,text: `Current state in ${country}`},
            }}
            />
        ) : null
    );


    return(
        <div className={styles.container}>
            {country ? barChart : lineChart}
        </div>
    )
}


export default Chart;