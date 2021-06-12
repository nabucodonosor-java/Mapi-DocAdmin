package com.mapi.docadm.controllers;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.mapi.docadm.dto.MedicoDto;
import com.mapi.docadm.dto.UriDto;
import com.mapi.docadm.services.MedicoService;

@RestController
@RequestMapping("/medicos")
public class MedicoController {

	@Autowired
	private MedicoService service;	

	@GetMapping
	public ResponseEntity<Page<MedicoDto>> findAll(
			@RequestParam(value = "especialidadeId", defaultValue = "0") Long especialidadeId,
			@RequestParam(value = "nome", defaultValue = "") String nome,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "nome") String orderBy) {
				
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<MedicoDto> list = service.findAllPaged(pageRequest, especialidadeId, nome.trim());
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/pesq-especializacao")
	public ResponseEntity<Page<MedicoDto>> findAllEspecializacao(
			@RequestParam(value = "especializacaoId", defaultValue = "0") Long especializacaoId,
			@RequestParam(value = "nome", defaultValue = "") String nome,
			@RequestParam(value = "page", defaultValue = "0") Integer page,
			@RequestParam(value = "linesPerPage", defaultValue = "12") Integer linesPerPage,
			@RequestParam(value = "direction", defaultValue = "ASC") String direction,
			@RequestParam(value = "orderBy", defaultValue = "nome") String orderBy) {
				
		PageRequest pageRequest = PageRequest.of(page, linesPerPage, Direction.valueOf(direction), orderBy);
		Page<MedicoDto> list = service.findAllPagedEspecializacao(pageRequest, especializacaoId, nome.trim());
		
		return ResponseEntity.ok().body(list);

	}
	
	@GetMapping("/{id}")
	public ResponseEntity<MedicoDto> findById(@PathVariable Long id) {
		MedicoDto entity = service.findById(id);
		return ResponseEntity.ok().body(entity);
	}
	
	@PostMapping
	public ResponseEntity<MedicoDto> insert(@Valid @RequestBody MedicoDto dto) {
		dto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(dto.getId()).toUri();
		return ResponseEntity.created(uri).body(dto);
	}
	
	@PostMapping("/image")
	public ResponseEntity<UriDto> uploadFile(@RequestParam("file") MultipartFile file) {
		UriDto dto = service.uploadFile(file);
		return ResponseEntity.ok().body(dto);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<MedicoDto> update(@PathVariable Long id, @Valid @RequestBody MedicoDto dto) {
		dto = service.update(id, dto);
		return ResponseEntity.ok().body(dto);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> delete(@PathVariable Long id) {
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
}