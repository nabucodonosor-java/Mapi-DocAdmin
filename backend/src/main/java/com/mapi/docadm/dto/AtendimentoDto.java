package com.mapi.docadm.dto;

import java.io.Serializable;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Atendimento;

public class AtendimentoDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String nome;
	
	public AtendimentoDto() {}
	
	public AtendimentoDto(Atendimento entity) {
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

	public static Page<AtendimentoDto> converter(Page<Atendimento> page) {
		return page.map(AtendimentoDto::new); 
	}

}
