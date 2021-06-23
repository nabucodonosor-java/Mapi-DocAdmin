import { Servico } from "./Servico"

export type FuncionarioResponse = {
    content: Funcionario[];
    totalPages: number;
}

export type Funcionario = {
    id: number;
    nome: string;
}

export type FuncionarioPage = {
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