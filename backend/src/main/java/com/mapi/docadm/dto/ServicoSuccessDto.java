package com.mapi.docadm.dto;

import java.io.Serializable;

import com.mapi.docadm.entities.Funcionario;

public class ServicoSuccessDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nomeFuncionario;
	private Long qtdeServico;
	private Long qtdeFinalizado;

	public ServicoSuccessDto() {
	}

	public ServicoSuccessDto(Funcionario funcionario, Long qtdeServico, Long qtdeFinalizado) {
		nomeFuncionario = funcionario.getNome();
		this.qtdeServico = qtdeServico;
		this.qtdeFinalizado = qtdeFinalizado;
	}

	public String getNomeFuncionario() {
		return nomeFuncionario;
	}

	public void setNomeFuncionario(String nomeFuncionario) {
		this.nomeFuncionario = nomeFuncionario;
	}

	public Long getQtdeServico() {
		return qtdeServico;
	}

	public void setQtdeServico(Long qtdeServico) {
		this.qtdeServico = qtdeServico;
	}

	public Long getQtdeFinalizado() {
		return qtdeFinalizado;
	}

	public void setQtdeFinalizado(Long qtdeFinalizado) {
		this.qtdeFinalizado = qtdeFinalizado;
	}

}
