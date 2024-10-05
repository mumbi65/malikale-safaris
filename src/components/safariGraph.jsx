import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJs, LineElement, CategoryScale, LinearScale, PointElement, plugins, scales } from "chart.js";


ChartJs.register(LineElement, CategoryScale, LinearScale, PointElement)

const SafariGraph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        datasets: [
            {
                label: 'Past Safaris',
                data: [2,3,5,8,2,4],
                fill: false,
                borderColor: '#029132',
                tension: 0.1,
            },
            {
                label: 'Upcoming Safaris',
                data: [1,2,3,4,6,8],
                fill: false,
                borderColor: '#f39c12',
                tension: 0.1,
            },
        ],
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            x: {
                beginArZero: true,
            },
            y: {
                beginArZero: true,
            },
        },
    }

    return (
        <>
        <div>
            <h3>Safari Schedule</h3>
            <Line data={data} options={options}/>
        </div>
        </>
    )
}

export default SafariGraph