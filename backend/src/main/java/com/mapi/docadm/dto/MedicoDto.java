package com.mapi.docadm.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Atendimento;
import com.mapi.docadm.entities.Cidade;
import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.entities.Especializacao;
import com.mapi.docadm.entities.Local;
import com.mapi.docadm.entities.Medico;

public class MedicoDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private String imgUrl;
	private String crm;

	@NotBlank(message = "Campo obrigatório")
	private String nome;

	private String celular;

	@Email(message = "Digitar email válido!")
	private String email;

	@PastOrPresent(message = "A data não pode ser futura")
	private Instant dataNascimento;

	private String curriculo;
	private String horarioAtendimento;

	@NotBlank(message = "Campo obrigatório")
	private String cep;

	private String logradouro;

	private String complemento;

	private String bairro;

	private String localidade;

	private String uf;

	private Instant visitaAgendada;

	private List<EspecializacaoDto> especializacoes = new ArrayList<>();

	private List<EspecialidadeDto> especialidades = new ArrayList<>();

	private List<AtendimentoDto> atendimentos = new ArrayList<>();

	private List<LocalDto> locais = new ArrayList<>();

	private List<CidadeDto> cidades = new ArrayList<>();

	public MedicoDto() {
	}

	public MedicoDto(Medico entity) {
		id = entity.getId();
		imgUrl = entity.getImgUrl();
		crm = entity.getCrm();
		nome = entity.getNome();
		celular = entity.getCelular();
		email = entity.getEmail();
		dataNascimento = entity.getDataNascimento();
		curriculo = entity.getCurriculo();
		horarioAtendimento = entity.getHorarioAtendimento();
		cep = entity.getCep();
		logradouro = entity.getLogradouro();
		complemento = entity.getComplemento();
		bairro = entity.getBairro();
		localidade = entity.getLocalidade();
		uf = entity.getUf();
		visitaAgendada = entity.getVisitaAgendada();
	}

	public MedicoDto(Medico entity, Set<Especializacao> especializacoes, Set<Especialidade> especialidades,
			Set<Atendimento> atendimentos, Set<Cidade> cidades, Set<Local> locais) {

		this(entity);

		especializacoes.forEach(especializacao -> this.getEspecializacoes().add(new EspecializacaoDto(especializacao)));

		especialidades.forEach(especialidade -> this.getEspecialidades().add(new EspecialidadeDto(especialidade)));

		atendimentos.forEach(atendimento -> this.getAtendimentos().add(new AtendimentoDto(atendimento)));

		cidades.forEach(cidade -> this.getCidades().add(new CidadeDto(cidade)));

		locais.forEach(local -> this.getLocais().add(new LocalDto(local)));

	}

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

	public List<EspecializacaoDto> getEspecializacoes() {
		return especializacoes;
	}

	public List<EspecialidadeDto> getEspecialidades() {
		return especialidades;
	}

	public List<AtendimentoDto> getAtendimentos() {
		return atendimentos;
	}

	public List<LocalDto> getLocais() {
		return locais;
	}

	public List<CidadeDto> getCidades() {
		return cidades;
	}

	public static Page<MedicoDto> converter(Page<Medico> list) {
		return list.map(MedicoDto::new);
	}
}