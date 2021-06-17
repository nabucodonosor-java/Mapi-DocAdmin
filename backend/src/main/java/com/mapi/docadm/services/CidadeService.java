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

import com.mapi.docadm.dto.CidadeDto;
import com.mapi.docadm.entities.Cidade;
import com.mapi.docadm.repositories.CidadeRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class CidadeService {

	@Autowired
	private CidadeRepository repository;

	@Transactional(readOnly = true)
	public Page<CidadeDto> findAllPaged(PageRequest pageRequest, String nome) {
		Page<Cidade> cidades = repository.findNome(nome, pageRequest);
		return CidadeDto.converter(cidades);
	}

	@Transactional(readOnly = true)
	public CidadeDto findById(Long id) {
		Optional<Cidade> optional = repository.findById(id);
		Cidade cidade = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Cidade não encontrada!"));
		return new CidadeDto(cidade);
	}

	@Transactional
	public CidadeDto insert(CidadeDto dto) {
		Cidade cidade = new Cidade();
		cidade.setNome(dto.getNome());
		cidade.setUf(dto.getUf());
		cidade = repository.save(cidade);
		return new CidadeDto(cidade);
	}

	@Transactional
	public CidadeDto update(Long id, CidadeDto dto) {
		try {

			Cidade cidade = repository.getOne(id);
			cidade.setNome(dto.getNome());
			cidade.setUf(dto.getUf());
			cidade = repository.save(cidade);
			return new CidadeDto(cidade);

		} catch (EntityNotFoundException e) {
			throw new EntidadeNaoEncontradaException("Cidade não encontrada!");
		}
	}

	public void delete(Long id) {
		try {

			repository.deleteById(id);

		} catch (EmptyResultDataAccessException e) {
			throw new EntidadeNaoEncontradaException("Cidade não encontrada!");
		} catch (DataIntegrityViolationException e) {
			throw new DBException("Violação de integridade do DB");
		}
	}
}
