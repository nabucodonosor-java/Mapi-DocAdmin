package com.mapi.docadm.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Cidade;

public class CidadeDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String nome;

	@NotBlank(message = "Campo obrigatório")
	private String uf;

	public CidadeDto() {
	}

	public CidadeDto(Cidade entity) {
		id = entity.getId();
		nome = entity.getNome();
		uf = entity.getUf();
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

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public static Page<CidadeDto> converter(Page<Cidade> cidades) {
		return cidades.map(CidadeDto::new);
	}

}
