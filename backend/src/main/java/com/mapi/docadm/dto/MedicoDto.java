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
	private String cidade;
	private String local;

	private List<EspecializacaoDto> especializacoes = new ArrayList<>();

	private List<EspecialidadeDto> especialidades = new ArrayList<>();

	private List<AtendimentoDto> atendimentos = new ArrayList<>();
	
	private List<LocalDto> locais = new ArrayList<>();
	
	private List<CidadeDto> cidades = new ArrayList<>();

	public MedicoDto() {
	}

	public MedicoDto(Medico entity) {
		setId(entity.getId());
		setImgUrl(entity.getImgUrl());
		setCrm(entity.getCrm());
		setNome(entity.getNome());
		setCelular(entity.getCelular());
		setEmail(entity.getEmail());
		setDataNascimento(entity.getDataNascimento());
		setCurriculo(entity.getCurriculo());
		setHorarioAtendimento(entity.getHorarioAtendimento());
		setCidade(entity.getCidade());
		setLocal(entity.getLocal());
	}

	public MedicoDto(Medico entity, Set<Especializacao> especializacoes, 
			Set<Especialidade> especialidades, Set<Atendimento> atendimentos, Set<Cidade> cidades,
			Set<Local> locais) {
		
		this(entity);
		
		especializacoes.forEach(especializacao -> 
		this.getEspecializacoes().add(new EspecializacaoDto(especializacao)));
		
		especialidades.forEach(especialidade -> 
		this.getEspecialidades().add(new EspecialidadeDto(especialidade)));
		
		atendimentos.forEach(atendimento -> 
		this.getAtendimentos().add(new AtendimentoDto(atendimento)));
		
		cidades.forEach(cidade -> 
		this.getCidades().add(new CidadeDto(cidade)));
		
		locais.forEach(local -> 
		this.getLocais().add(new LocalDto(local)));
		
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

	public String getCidade() {
		return cidade;
	}

	public void setCidade(String cidade) {
		this.cidade = cidade;
	}

	public String getLocal() {
		return local;
	}

	public void setLocal(String local) {
		this.local = local;
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