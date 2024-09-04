import { Pie } from '@ant-design/plots';

interface PieChartProps {
    data: {
        key: string,
        value: number
    }[]
}

const PieChart = ({ data }: PieChartProps) => {
    const config = {
        data,
        angleField: 'value',
        colorField: 'key',
        label: {
            text: 'key',
            style: {
                fontWeight: 'bold',
            },
        },
        legend: false,
    };
    return <Pie {...config} />
}

export default PieChart