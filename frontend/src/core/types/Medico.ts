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
    especializacoes: Especializacao[];
    especialidades: Especialidade[];
    atendimentos: Atendimento[];
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