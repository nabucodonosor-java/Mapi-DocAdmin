package com.mapi.docadm.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapi.docadm.dto.ServicoDto;
import com.mapi.docadm.dto.ServicoSuccessDto;
import com.mapi.docadm.dto.ServicoTotalServicosDto;
import com.mapi.docadm.entities.Servico;
import com.mapi.docadm.repositories.FuncionarioRepository;
import com.mapi.docadm.repositories.ServicoRepository;

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

}
