import { PieChart } from 'react-minimal-pie-chart';

const Chart = ({ data }: { data: any }) => {
    const tesData = [
        {
            title: '식비',
            value: data['eat'].percent,
            color: '#FFCBE7',
        },
        {
            title: '게임',
            value: data['game'].percent,
            color: '#8CCFFF',
        },
        {
            title: '생활',
            value: data['living'].percent,
            color: '#B7FF8C',
        },
        {
            title: '교통',
            value: data['trans'].percent,
            color: '#DEDEDE',
        },
        {
            title: '기타',
            value: data['etc'].percent,
            color: '#fff587',
        },
    ];

    return (
        <PieChart
            data={tesData}
            reveal={100}
            lineWidth={60}
            lengthAngle={360}
            label={({ dataEntry }) => `${dataEntry.title} ${dataEntry.value}%`}
            labelStyle={{
                fontSize: '5px',
                fill: '#393939',
            }}
            animate
            labelPosition={65}
        />
    );
};

export default Chart;
