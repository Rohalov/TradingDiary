import PropTypes from 'prop-types';
import Highcharts from 'highcharts/highstock'
import HighchartsReact from 'highcharts-react-official'
import './StackedBarChart.css';

function StackedBarChar(props) {

    const options = {
        colors: [
            '#e30a0a',
            '#08b634'
        ],
        chart: {
            type: 'pie'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        title: {
            text: 'Співвідношення угод'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {y} '
                },
                showInLegend: true
            }
        },
        series: [{
            name: 'Відсоток',
            colorByPoint: true,
            innerSize: '70%',
            data: [
                {
                    name: 'Збиткові',
                    y: props.loss 
                },
                {
                    name: 'Прибуткові',
                    y: props.profit
                }
            ]
        }]
    };

    return (
        <div className="chart-container">
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
            />
        </div>
    )
}

StackedBarChar.propTypes = {
    profit: PropTypes.number.isRequired,
    loss: PropTypes.number.isRequired
};

export default StackedBarChar
