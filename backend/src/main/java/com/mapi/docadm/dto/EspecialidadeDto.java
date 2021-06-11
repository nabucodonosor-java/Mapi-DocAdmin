package com.mapi.docadm.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Especialidade;

public class EspecialidadeDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String nome;
	
	public EspecialidadeDto() {}
	
	public EspecialidadeDto(Especialidade entity) {
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
	
	public static Page<EspecialidadeDto> converter(Page<Especialidade> list) {
		return list.map(EspecialidadeDto::new);
	}
}
