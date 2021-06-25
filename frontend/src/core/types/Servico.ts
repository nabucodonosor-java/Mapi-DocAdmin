import { Funcionario } from './Funcionario';

export type ServicoResponse = {
    content: Servico[];
    totalPages: number;
}

export type Servico = {
    id: number;
    qtdeServico: number;
    qtdeFinalizado: number;
    descricao: string;
    date: string;
    funcionario: Funcionario;
}

export type ServicoPage = {
    content?: Servico[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size?: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty?: boolean;
}

export type ServicoSuccess = {
    nomeFuncionario: string;
    qtdeServico: number;
    qtdeFinalizado: number;
}

export type ServicoTotal = {
    nomeFuncionario: string;
    totalServicos: number;
}