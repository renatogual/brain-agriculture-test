import { Pie } from '@ant-design/plots';

interface PieChartProps {
    data: {
        state: string,
        value: number
    }
}

const PieChart = () => {
    const config = {
        data: [
            { state: 'MG', value: 27 },
            { state: 'GO', value: 25 },
            { state: 'MG', value: 18 },
            { state: 'SP', value: 15 },
            { state: 'RJ', value: 10 },
            { state: 'PR', value: 5 },
        ],
        angleField: 'value',
        colorField: 'state',
        label: {
            text: 'state',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: {
            color: {
                title: false,
                position: 'right',
                rowPadding: 5,
            },
        },
    };
    return <Pie {...config} />
}

export default PieChart