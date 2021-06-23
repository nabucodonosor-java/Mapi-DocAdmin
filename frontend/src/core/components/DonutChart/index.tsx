import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ServicoTotal } from 'core/types/Servico';
import { makePrivateRequest } from 'core/utils/request';

type ChartData = {
    labels: string[];
    series: number[];
}

const DonutChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ labels: [], series: [] });

    useEffect(() => {
        makePrivateRequest({ url: 'servicos/total-servico-by-funcionario' })
            .then(response => {
                const data = response.data as ServicoTotal[];
                const myLabels = data.map(x => x.nomeFuncionario);
                const mySeries = data.map(x => x.totalServicos);

                setChartData({ labels: myLabels, series: mySeries });
            });
    }, []);

    const options = {
        legend: {
            show: true
        }
    }
    
    // const mockData = {
    //     labels: {
    //         categories: ['Anakin', 'Barry Allen', 'Kal-El', 'Logan', 'Padmé']
    //    },
    //    series: [
    //        {
    //            name: "% Sucesso",
    //            data: [43.6, 67.1, 67.7, 45.6, 71.1]                   
    //        }
    //    ]
    // };

    return (
        <Chart
        options={{ ...options, labels: chartData.labels }}
        series={chartData.series}
        type="donut"
        height="240"
    />
    );
}

export default DonutChart;