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

import com.mapi.docadm.dto.EspecializacaoDto;
import com.mapi.docadm.entities.Especializacao;
import com.mapi.docadm.repositories.EspecializacaoRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class EspecializacaoService {
	
	@Autowired
	private EspecializacaoRepository repository;
	
	@Transactional(readOnly = true)
	public Page<EspecializacaoDto> findAllPaged(PageRequest pageRequest) {
		Page<Especializacao> page = repository.findAll(pageRequest);
		return EspecializacaoDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public EspecializacaoDto findById(Long id) {
		Optional<Especializacao> optional = repository.findById(id);
		Especializacao entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Especialização não encontrada!"));
		return new EspecializacaoDto(entity);
	}
	
	@Transactional
	public EspecializacaoDto insert(EspecializacaoDto dto) {
		Especializacao entity = new Especializacao();
		entity.setNome(dto.getNome());
		entity = repository.save(entity);
		return new EspecializacaoDto(entity);
	}
	
	@Transactional
	public EspecializacaoDto update(Long id, EspecializacaoDto dto) {
		try {
			Especializacao entity = repository.getOne(id);
			entity.setNome(dto.getNome());
			entity = repository.save(entity);
			return new EspecializacaoDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Especialização não encontrada!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Especialização não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação de integridade do DB");
		}
	}
}
