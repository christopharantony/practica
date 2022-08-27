import { Line } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

function LineChart({ data, value }) {
    return (
        <div style={{ width: '97%', marginLeft: 'auto', marginRight: 'auto', marginTop: '25px' }}>
            <Line
                options={{
                    scales: {
                        y: {
                            ticks: {
                                stepSize: 1,
                            },
                            beginAtZero: true,
                        }
                    },
                }}
                data={{
                    labels: value,
                    datasets: [
                        {
                            label: 'Interview Status',
                            data: data,
                            backgroundColor: [
                                '#0000FF',
                                '#4EEE94',
                                '#F08000',
                            ],
                            borderColor: '#CECDCA'
                        },
                    ],

                }} />
        </div>
    )
}

export default LineChart
