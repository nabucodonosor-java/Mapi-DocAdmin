package com.mapi.docadm.controllers;

import java.net.URI;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

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
	
	@GetMapping("/{id}")
	public ResponseEntity<ServicoDto> findById(@PathVariable Long id) {
		ServicoDto entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping
	public ResponseEntity<ServicoDto> insert(@Valid @RequestBody ServicoDto dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	
	@PutMapping("/{id}")
	public ResponseEntity<ServicoDto> update(@PathVariable Long id, @Valid @RequestBody ServicoDto dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}

}