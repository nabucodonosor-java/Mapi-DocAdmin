export type MedicoResponse = {
    content: Medico[];
    totalPages: number;
}

export type Medico = {
    id: number;
    imgUrl: string;
    crm: string;
    nome: string;
    celular: string;
    email: string;
    dataNascimento: Date;
    curriculo: string;
    horarioAtendimento: string;
    cidade: string;
    local: string;
    especializacoes: Especializacao[];
    especialidades: Especialidade[];
    atendimentos: Atendimento[];
    locais: Local[];
    cidades: Cidade[];
}

export type Especializacao = {
    id: number;
    nome: string;
}

export type Especialidade = {
    id: number;
    nome: string;
}

export type Atendimento = {
    id: number;
    nome: string;
}

export type Local = {
    id: number;
    nome: string;
}

export type Cidade = {
    id: number;
    nome: string;
    uf: string;
}