import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { ServicoSuccess } from 'core/types/Servico';
import { round } from 'core/utils/format';
import { makePrivateRequest } from 'core/utils/request';

type SeriesData = { 
    name: string;
    data: number[];
}

type ChartData = {
    labels: {
        categories: string[];
    };
    series: SeriesData[];
}

const BarChart = () => {

    const [chartData, setChartData] = useState<ChartData>({ 
        labels: {
            categories: []
        },
        series: [
            {
                name: "",
                data: []
            }
        ]
     });

    useEffect(() => {
        makePrivateRequest({ url: 'servicos/success-by-funcionario' })
            .then(response => {
                const data = response.data as ServicoSuccess[];
                const myLabels = data.map(x => x.nomeFuncionario);
                const mySeries = data.map(x => round(100 * x.qtdeFinalizado / x.qtdeServico, 1));

                setChartData({ 
                    labels: {
                        categories: myLabels
                    },
                    series: [
                        {
                            name: "% Success",
                            data: mySeries
                        }
                    ]
                 });
            });
    }, []);

    const options = {
        plotOptions: {
            bar: {
                horizontal: true,
            }
        },
    };
    
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
            options={{ ...options, xaxis: chartData.labels }}
            series={chartData.series}
            type="bar"
            height="240"
        />
    );
}

export default BarChart;