package com.mapi.docadm.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Especializacao;

public class EspecializacaoDto implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	@NotBlank(message = "Campo obrigatório")
	private String nome;
	
	public EspecializacaoDto() {}
	
	public EspecializacaoDto(Especializacao entity) {
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
	
	public static Page<EspecializacaoDto> converter(Page<Especializacao> list) {
		return list.map(EspecializacaoDto::new);
	}
}
