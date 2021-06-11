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

import com.mapi.docadm.dto.EspecialidadeDto;
import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.repositories.EspecialidadeRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class EspecialidadeService {
	
	@Autowired
	private EspecialidadeRepository repository;
	
	@Transactional(readOnly = true)
	public Page<EspecialidadeDto> findAllPaged(PageRequest pageRequest) {
		Page<Especialidade> page = repository.findAll(pageRequest);
		return EspecialidadeDto.converter(page);
	}
	
	@Transactional(readOnly = true)
	public EspecialidadeDto findById(Long id) {
		Optional<Especialidade> optional = repository.findById(id);
		Especialidade entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Especialidade não encontrada!"));
		return new EspecialidadeDto(entity);
	}
	
	@Transactional
	public EspecialidadeDto insert(EspecialidadeDto dto) {
		Especialidade entity = new Especialidade();
		entity.setNome(dto.getNome());
		entity = repository.save(entity);
		return new EspecialidadeDto(entity);
	}
	
	@Transactional
	public EspecialidadeDto update(Long id, EspecialidadeDto dto) {
		try {
			Especialidade entity = repository.getOne(id);
			entity.setNome(dto.getNome());
			entity = repository.save(entity);
			return new EspecialidadeDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Especialidade não encontrada!");
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
