package com.mapi.docadm.entities;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;

import org.checkerframework.common.aliasing.qual.Unique;

@Entity
@Table(name = "tb_medico")
public class Medico implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(columnDefinition = "TEXT")
	private String imgUrl;

	@Column(unique = true)
	@Unique
	private String crm;

	@Column(unique = true)
	@Unique
	private String nome;

	private String celular;

	@Email
	@Column(unique = true)
	@Unique
	private String email;

	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant dataNascimento;

	@Column(columnDefinition = "TEXT")
	private String curriculo;

	@Column(columnDefinition = "TEXT")
	private String horarioAtendimento;
	
	private String cep;
	
	private String logradouro;
	
	private String complemento;
	
	private String bairro;
	
	private String localidade;
	
	private String uf;


	@Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
	private Instant visitaAgendada;

	@ManyToMany
	@JoinTable(name = "tb_medico_especializacao", joinColumns = @JoinColumn(name = "medico_id"), inverseJoinColumns = @JoinColumn(name = "especializacao_id"))
	private Set<Especializacao> especializacoes = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "tb_medico_especialidade", joinColumns = @JoinColumn(name = "medico_id"), inverseJoinColumns = @JoinColumn(name = "especialidade_id"))
	private Set<Especialidade> especialidades = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "tb_medico_atendimento", joinColumns = @JoinColumn(name = "medico_id"), inverseJoinColumns = @JoinColumn(name = "atendimento_id"))
	private Set<Atendimento> atendimentos = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "tb_medico_local", joinColumns = @JoinColumn(name = "medico_id"), inverseJoinColumns = @JoinColumn(name = "local_id"))
	private Set<Local> locais = new HashSet<>();

	@ManyToMany
	@JoinTable(name = "tb_medico_cidade", joinColumns = @JoinColumn(name = "medico_id"), inverseJoinColumns = @JoinColumn(name = "cidade_id"))
	private Set<Cidade> cidades = new HashSet<>();

	

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getCrm() {
		return crm;
	}

	public void setCrm(String crm) {
		this.crm = crm;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}

	public String getCelular() {
		return celular;
	}

	public void setCelular(String celular) {
		this.celular = celular;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Instant getDataNascimento() {
		return dataNascimento;
	}

	public void setDataNascimento(Instant dataNascimento) {
		this.dataNascimento = dataNascimento;
	}

	public String getCurriculo() {
		return curriculo;
	}

	public void setCurriculo(String curriculo) {
		this.curriculo = curriculo;
	}

	public String getHorarioAtendimento() {
		return horarioAtendimento;
	}

	public void setHorarioAtendimento(String horarioAtendimento) {
		this.horarioAtendimento = horarioAtendimento;
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

	public Instant getVisitaAgendada() {
		return visitaAgendada;
	}

	public void setVisitaAgendada(Instant visitaAgendada) {
		this.visitaAgendada = visitaAgendada;
	}

	public Set<Especializacao> getEspecializacoes() {
		return especializacoes;
	}

	public Set<Especialidade> getEspecialidades() {
		return especialidades;
	}

	public Set<Atendimento> getAtendimentos() {
		return atendimentos;
	}

	public Set<Local> getLocais() {
		return locais;
	}

	public Set<Cidade> getCidades() {
		return cidades;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Medico other = (Medico) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

}