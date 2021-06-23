import { useState, useEffect } from "react";
import { ServicoPage } from "core/types/Servico";
import { formatLocalDate } from "core/utils/format";
import { makePrivateRequest } from "core/utils/request";
import Pagination from 'core/components/PagDataTable';

const DataTable = () => {

    const [activePage, setActivePage] = useState(0);

    const [page, setPage] = useState<ServicoPage>({
        first: true,
        last: true,
        number: 0,
        totalElements: 0,
        totalPages: 0
    });

    useEffect(() => {
        makePrivateRequest({ url: `/servicos?page=${activePage}&size=5&sort=date,desc` })
            .then(response => {
                setPage(response.data)
            });
    }, [activePage]);

    const changePage = (index: number) => {
        setActivePage(index);
    }

    return (
        <>
        <Pagination page={page} onPageChange={changePage} />
        <div className="table-responsive">
            <table className="table table-striped table-sm">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Funcionário</th>
                        <th>Qtde de Serviços</th>
                        <th>Serviços Concluídos</th>
                        <th>Descrição</th>
                    </tr>
                </thead>
                <tbody>
                    {page.content?.map(item => (
                        <tr key={item.id}>
                            <td>{formatLocalDate(item.date, "dd/MM/yyyy")}</td>
                            <td>{item.funcionario.nome}</td>
                            <td>{item.qtdeServico}</td>
                            <td>{item.qtdeFinalizado}</td>
                            <td>{item.descricao}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </>
    );
}

export default DataTable;