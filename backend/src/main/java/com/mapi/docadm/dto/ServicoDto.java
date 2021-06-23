package com.mapi.docadm.dto;

import java.io.Serializable;
import java.time.LocalDate;

import org.springframework.data.domain.Page;

import com.mapi.docadm.entities.Servico;

public class ServicoDto implements Serializable {
	private static final long serialVersionUID = 1L;

	private Long id;
	private Integer qtdeServico;
	private Integer qtdeFinalizado;
	private LocalDate date;
	private String descricao;

	private FuncionarioDto funcionario;

	public ServicoDto() {
	}

	public ServicoDto(Servico entity) {
		id = entity.getId();
		qtdeServico = entity.getQtdeServico();
		qtdeFinalizado = entity.getQtdeFinalizado();
		date = entity.getDate();
		descricao = entity.getDescricao();
		funcionario = new FuncionarioDto(entity.getFuncionario());
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getQtdeServico() {
		return qtdeServico;
	}

	public void setQtdeServico(Integer qtdeServico) {
		this.qtdeServico = qtdeServico;
	}

	public Integer getQtdeFinalizado() {
		return qtdeFinalizado;
	}

	public void setQtdeFinalizado(Integer qtdeFinalizado) {
		this.qtdeFinalizado = qtdeFinalizado;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public FuncionarioDto getFuncionario() {
		return funcionario;
	}

	public void setFuncionario(FuncionarioDto funcionario) {
		this.funcionario = funcionario;
	}

	public static Page<ServicoDto> converter(Page<Servico> servicos) {
		return servicos.map(ServicoDto::new);
	}

}
