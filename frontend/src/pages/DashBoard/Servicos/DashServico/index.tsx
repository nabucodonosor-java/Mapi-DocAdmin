import BarChart from 'core/components/BarChart';
import DataTable from 'core/components/DataTable';
import DonutChart from 'core/components/DonutChart';

const DashServico = () => { 
    return (
        <>
            <div className="container">
                <h1 className="text-primary text-center py-3">Dashboard Laboratório Ortopédico</h1>

                <div className="row px-3">
                    <div className="col-sm-6">
                        <h5 className="text-center title-dash-success">Taxa de conclusão dos serviços %</h5>
                        <BarChart />
                    </div>
                    <div className="col-sm-6">
                        <h5 className="text-center title-dash-success">Todas os serviços</h5>
                        <DonutChart />
                    </div>
                </div>
                <div className="py-3">
                    <h2 className="text-primary">Todas os serviços</h2>
                </div>
                <DataTable />
            </div>
        </>
    );
}

export default DashServico;