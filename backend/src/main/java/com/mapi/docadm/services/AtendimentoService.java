package com.mapi.docadm.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapi.docadm.dto.AtendimentoDto;
import com.mapi.docadm.entities.Atendimento;
import com.mapi.docadm.repositories.AtendimentoRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class AtendimentoService {
	
	@Autowired
	private AtendimentoRepository repository;
	
	@Transactional(readOnly = true)
	public Page<AtendimentoDto> findAllPaged(PageRequest pageRequest, String nome) {
		Page<Atendimento> page = repository.find(nome, pageRequest);
		return AtendimentoDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public AtendimentoDto findById(Long id) {
		Optional<Atendimento> optional = repository.findById(id);
		Atendimento entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Atendimento não encontrada!"));
		return new AtendimentoDto(entity);
	}
	
	@Transactional
	public AtendimentoDto insert(AtendimentoDto dto) {
		Atendimento entity = new Atendimento();
		entity.setNome(dto.getNome());
		entity = repository.save(entity);
		return new AtendimentoDto(entity);
	}
	
	@Transactional
	public AtendimentoDto update(Long id, AtendimentoDto dto) {
		try {
			Atendimento entity = repository.getOne(id);
			entity.setNome(dto.getNome());
			entity = repository.save(entity);
			return new AtendimentoDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Atendimento não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Especialidade não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação de integridade do DB");
		}
	}

}
