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

import com.mapi.docadm.dto.LocalDto;
import com.mapi.docadm.entities.Local;
import com.mapi.docadm.repositories.LocalRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class LocalService {

	@Autowired
	private LocalRepository repository;
	
	@Transactional(readOnly = true)
	public Page<LocalDto> findAllPaged(PageRequest pageRequest, String nome) {
		Page<Local> locais = repository.findNome(nome, pageRequest);
		return LocalDto.converter(locais);
	}
	
	@Transactional(readOnly = true)
	public LocalDto findById(Long id) {
		Optional<Local> optional = repository.findById(id);
		Local local = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Local não encontrado!"));
		return new LocalDto(local);
	}
	
	@Transactional
	public LocalDto insert(LocalDto dto) {
		Local entity = new Local();
		copyToEntity(dto, entity);
		entity = repository.save(entity);
		return new LocalDto(entity);
	}

	@Transactional
	public LocalDto update(Long id, LocalDto dto) {
		try {
			
			Local entity = repository.getOne(id);
			copyToEntity(dto, entity);
			entity = repository.save(entity);
			return new LocalDto(entity);
			
		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Local não encontrado!");
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
	
	private void copyToEntity(LocalDto dto, Local entity) {
		entity.setNome(dto.getNome());
		entity.setCep(dto.getCep());
		entity.setLogradouro(dto.getLogradouro());
		entity.setComplemento(dto.getComplemento());
		entity.setBairro(dto.getBairro());
		entity.setLocalidade(dto.getLocalidade());
		entity.setUf(dto.getUf());	
	}
}
