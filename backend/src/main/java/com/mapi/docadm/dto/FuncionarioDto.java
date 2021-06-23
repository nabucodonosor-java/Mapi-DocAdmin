package com.mapi.docadm.dto;

import java.io.Serializable;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Funcionario;

public class FuncionarioDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String nome;

	public FuncionarioDto() {
	}

	public FuncionarioDto(Funcionario entity) {
		id = entity.getId();
		nome = entity.getNome();
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public static Page<FuncionarioDto> converter(Page<Funcionario> funcionarios) {
		return funcionarios.map(FuncionarioDto::new);
	}

}
