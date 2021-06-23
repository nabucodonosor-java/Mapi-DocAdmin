package com.mapi.docadm.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mapi.docadm.dto.FuncionarioDto;
import com.mapi.docadm.services.FuncionarioService;

@RestController
@RequestMapping("/funcionarios")
public class FuncionarioController {
	
	@Autowired
	private FuncionarioService service;
	
	@GetMapping
	public ResponseEntity<Page<FuncionarioDto>> findAll(Pageable pageable) {
		Page<FuncionarioDto> list = service.findAll(pageable);
		return ResponseEntity.ok().body(list);
	}

}