package com.mapi.docadm.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mapi.docadm.dto.ServicoDto;
import com.mapi.docadm.dto.ServicoSuccessDto;
import com.mapi.docadm.dto.ServicoTotalServicosDto;
import com.mapi.docadm.services.ServicoService;

@RestController
@RequestMapping("/servicos")
public class ServicoController {
	
	@Autowired
	private ServicoService service;
	
	@GetMapping
	public ResponseEntity<Page<ServicoDto>> findAll(Pageable pageable) {
		Page<ServicoDto> list = service.findAll(pageable);
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/success-by-funcionario")
	public ResponseEntity<List<ServicoSuccessDto>> sucessGroupedByFuncionario() {
		List<ServicoSuccessDto> list = service.sucessGroupedByFuncionario();
		return ResponseEntity.ok().body(list);
	}
	
	@GetMapping("/total-servico-by-funcionario")
	public ResponseEntity<List<ServicoTotalServicosDto>> totalServicoGroupedByFuncionario() {
		List<ServicoTotalServicosDto> list = service.totalServicoGroupedByFuncionario();
		return ResponseEntity.ok().body(list);
	}

}