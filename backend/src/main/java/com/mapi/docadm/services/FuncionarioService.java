package com.mapi.docadm.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapi.docadm.dto.FuncionarioDto;
import com.mapi.docadm.entities.Funcionario;
import com.mapi.docadm.repositories.FuncionarioRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository repository;
	
	@Transactional(readOnly = true)
	public Page<FuncionarioDto> findAll(Pageable pageable) {
		Page<Funcionario> funcionarios = repository.findAll(pageable);
		return FuncionarioDto.converter(funcionarios);
	}
	
	@Transactional(readOnly = true)
	public FuncionarioDto findById(Long id) {
		Optional<Funcionario> optional = repository.findById(id);
		Funcionario entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Funcionário(a) não encontrado!"));
		return new FuncionarioDto(entity);
	}
	
	@Transactional
	public FuncionarioDto insert(FuncionarioDto dto) {
		Funcionario entity = new Funcionario();
		entity.setNome(dto.getNome());
		entity = repository.save(entity);
		return new FuncionarioDto(entity);
	}
	
	@Transactional
	public FuncionarioDto update(Long id, FuncionarioDto dto) {
		
		try {
			
			Funcionario entity = repository.getOne(id);
			entity.setNome(dto.getNome());
			entity = repository.save(entity);
			return new FuncionarioDto(entity);
			
		} catch (EntidadeNaoEncontradaException e) {
			throw new EntidadeNaoEncontradaException("Funcionário(a) não encontrado!");
		}
	}
	
	public void delete(Long id) {
		try {
			
			repository.deleteById(id);
			
		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Médico não encontrado!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação no DB");
		}
	}

}
