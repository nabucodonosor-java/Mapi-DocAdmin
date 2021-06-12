package com.mapi.docadm.services;

import java.net.URL;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.mapi.docadm.dto.EspecialidadeDto;
import com.mapi.docadm.dto.EspecializacaoDto;
import com.mapi.docadm.dto.MedicoDto;
import com.mapi.docadm.dto.UriDto;
import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.entities.Especializacao;
import com.mapi.docadm.entities.Medico;
import com.mapi.docadm.repositories.EspecialidadeRepository;
import com.mapi.docadm.repositories.EspecializacaoRepository;
import com.mapi.docadm.repositories.MedicoRepository;
import com.mapi.docadm.services.exceptions.DBException;
import com.mapi.docadm.services.exceptions.EntidadeNaoEncontradaException;

@Service
public class MedicoService {
	
	@Autowired
	private MedicoRepository repository;
	
	@Autowired
	private S3Service s3Service;
	
	@Autowired
	private EspecializacaoRepository especializacaoRepository;
	
	@Autowired
	private EspecialidadeRepository especialidadeRepository;
	
	@Transactional(readOnly = true)
	public Page<MedicoDto> findAllPaged(PageRequest pageRequest, Long especialidadeId, String nome) {
		List<Especialidade> especialidades = (especialidadeId == 0) ? null : Arrays.asList(especialidadeRepository.getOne(especialidadeId));
		Page<Medico> page = repository.find(especialidades, nome, pageRequest);
		repository.find(page.toList());
		return page.map(x -> new MedicoDto(x, x.getEspecializacoes(), x.getEspecialidades()));
	}
	
	@Transactional(readOnly = true)
	public Page<MedicoDto> findAllPagedEspecializacao(PageRequest pageRequest, Long especializacaoId, String nome) {
		List<Especializacao> especializacoes = (especializacaoId == 0) ? null : Arrays.asList(especializacaoRepository.getOne(especializacaoId));
		Page<Medico> page = repository.findEspecializacoes(especializacoes, nome, pageRequest);
		repository.findEspecializacoes(page.toList());
		return page.map(x -> new MedicoDto(x, x.getEspecializacoes(), x.getEspecialidades()));
	}
	
	@Transactional(readOnly = true)
	public MedicoDto findById(Long id) {
		Optional<Medico> optional = repository.findById(id);
		Medico entity = optional.orElseThrow(() -> new EntidadeNaoEncontradaException("Médico não encontrado!"));
		return new MedicoDto(entity, entity.getEspecializacoes(), entity.getEspecialidades());
 	}
	
	@Transactional
	public MedicoDto insert(MedicoDto dto) {
		Medico entity = new Medico();
		copyToEntity(dto, entity);
		
		entity = repository.save(entity);
		return new MedicoDto(entity);
	}
	
	@Transactional
	public MedicoDto update(Long id, MedicoDto dto) {
		
		try {
			
			Medico entity = repository.getOne(id);
			copyToEntity(dto, entity);
			entity = repository.save(entity);
			return new MedicoDto(entity);
			
			
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
	
	private void copyToEntity(MedicoDto dto, Medico entity) {
		entity.setImgUrl(dto.getImgUrl());
		entity.setCrm(dto.getCrm());
		entity.setNome(dto.getNome());
		entity.setCelular(dto.getCelular());
		entity.setEmail(dto.getEmail());
		entity.setDataNascimento(dto.getDataNascimento());
		entity.setCurriculo(dto.getCurriculo());
		entity.setHorarioAtendimento(dto.getHorarioAtendimento());
		
		entity.getEspecializacoes().clear();
		entity.getEspecialidades().clear();
		
		for (EspecializacaoDto especializacaoDto : dto.getEspecializacoes()) {
			Especializacao especializacao = especializacaoRepository.getOne(especializacaoDto.getId());
			entity.getEspecializacoes().add(especializacao);
		}
		
		for (EspecialidadeDto especialidadeDto : dto.getEspecialidades()) {
			Especialidade especialidade = especialidadeRepository.getOne(especialidadeDto.getId());
			entity.getEspecialidades().add(especialidade);
		}
	}
	
	public UriDto uploadFile(MultipartFile file) {
		
		URL url = s3Service.uploadFile(file);
		
		return new UriDto(url.toString());
	}
}