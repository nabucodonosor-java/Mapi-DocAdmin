package com.mapi.docadm.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapi.docadm.dto.ServicoDto;
import com.mapi.docadm.dto.ServicoSuccessDto;
import com.mapi.docadm.dto.ServicoTotalServicosDto;
import com.mapi.docadm.entities.Funcionario;
import com.mapi.docadm.entities.Servico;
import com.mapi.docadm.repositories.FuncionarioRepository;
import com.mapi.docadm.repositories.ServicoRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class ServicoService {
	
	@Autowired
	private ServicoRepository repository;
	
	@Autowired
	private FuncionarioRepository funcionarioRepository;
	
	@Transactional(readOnly = true)
	public Page<ServicoDto> findAll(Pageable pageable) {
		funcionarioRepository.findAll();
		Page<Servico> servicos = repository.findAll(pageable);
		return ServicoDto.converter(servicos);
	}
	
	@Transactional(readOnly = true)
	public List<ServicoSuccessDto> sucessGroupedByFuncionario() {
		return repository.sucessGroupedByFuncionario();
	}
	
	@Transactional(readOnly = true)
	public List<ServicoTotalServicosDto> totalServicoGroupedByFuncionario() {
		return repository.totalServicoGroupedByFuncionario();
	}
	
	@Transactional(readOnly = true)
	public ServicoDto findById(Long id) {
		Optional<Servico> optional = repository.findById(id);
		Servico entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Serviço não encontrado!"));
		return new ServicoDto(entity);
	}
	
	@Transactional
	public ServicoDto insert(ServicoDto dto) {
		Servico entity = new Servico();	
		copyToEntity(dto, entity);
		entity = repository.save(entity);
		
		return new ServicoDto(entity);
	}

	@Transactional
	public ServicoDto update(Long id, ServicoDto dto) {
		
		try {
			
			Servico entity = repository.getOne(id);
			copyToEntity(dto, entity);
			entity = repository.save(entity);
			return new ServicoDto(entity);
			
			
		} catch (EntidadeNaoEncontradaException e) {
			throw new EntidadeNaoEncontradaException("Médico não encontrado!");
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
	
	private void copyToEntity(ServicoDto dto, Servico entity) {
		entity.setDate(dto.getDate());
		entity.setQtdeFinalizado(dto.getQtdeFinalizado());
		entity.setQtdeServico(dto.getQtdeServico());
		entity.setDescricao(dto.getDescricao());
		entity.setFuncionario(new Funcionario(dto.getFuncionario()));
	}

}
