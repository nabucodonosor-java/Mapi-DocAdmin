package com.mapi.docadm.dto;

import java.io.Serializable;

import com.mapi.docadm.entities.Funcionario;

public class ServicoTotalServicosDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private String nomeFuncionario;
	private Long totalServicos;

	public ServicoTotalServicosDto() {
	}

	public ServicoTotalServicosDto(Funcionario funcionario, Long totalServicos) {
		nomeFuncionario = funcionario.getNome();
		this.totalServicos = totalServicos;
	}

	public String getNomeFuncionario() {
		return nomeFuncionario;
	}

	public void setNomeFuncionario(String nomeFuncionario) {
		this.nomeFuncionario = nomeFuncionario;
	}

	public Long getTotalServicos() {
		return totalServicos;
	}

	public void setTotalServicos(Long totalServicos) {
		this.totalServicos = totalServicos;
	}

}
