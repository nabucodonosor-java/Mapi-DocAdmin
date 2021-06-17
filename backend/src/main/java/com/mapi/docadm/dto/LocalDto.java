package com.mapi.docadm.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Local;

public class LocalDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;

	@NotBlank(message = "Campo obrigatório")
	private String nome;

	@NotBlank(message = "Campo obrigatório")
	private String cep;

	private String logradouro;

	private String complemento;

	private String bairro;

	private String localidade;

	private String uf;

	public LocalDto() {
	}

	public LocalDto(Local entity) {
		id = entity.getId();
		nome = entity.getNome();
		cep = entity.getCep();
		logradouro = entity.getLogradouro();
		complemento = entity.getComplemento();
		bairro = entity.getBairro();
		localidade = entity.getLocalidade();
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

	public String getCep() {
		return cep;
	}

	public void setCep(String cep) {
		this.cep = cep;
	}

	public String getLogradouro() {
		return logradouro;
	}

	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}

	public String getComplemento() {
		return complemento;
	}

	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}

	public String getBairro() {
		return bairro;
	}

	public void setBairro(String bairro) {
		this.bairro = bairro;
	}

	public String getLocalidade() {
		return localidade;
	}

	public void setLocalidade(String localidade) {
		this.localidade = localidade;
	}

	public String getUf() {
		return uf;
	}

	public void setUf(String uf) {
		this.uf = uf;
	}

	public static Page<LocalDto> converter(Page<Local> locais) {
		return locais.map(LocalDto::new);
	}
}
