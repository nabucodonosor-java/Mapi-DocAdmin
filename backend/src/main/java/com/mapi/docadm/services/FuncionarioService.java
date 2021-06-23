package com.mapi.docadm.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mapi.docadm.dto.FuncionarioDto;
import com.mapi.docadm.entities.Funcionario;
import com.mapi.docadm.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository repository;
	
	@Transactional(readOnly = true)
	public Page<FuncionarioDto> findAll(Pageable pageable) {
		Page<Funcionario> funcionarios = repository.findAll(pageable);
		return FuncionarioDto.converter(funcionarios);
	}

}
