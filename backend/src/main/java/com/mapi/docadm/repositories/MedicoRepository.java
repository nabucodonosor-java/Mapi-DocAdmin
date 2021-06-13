package com.mapi.docadm.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Atendimento;
import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.entities.Especializacao;
import com.mapi.docadm.entities.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.especialidades esp WHERE "
			+ "(COALESCE(:especialidades) IS NULL OR esp IN :especialidades) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> find(List<Especialidade> especialidades, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.especialidades WHERE obj IN :medicos")
	List<Medico> find(List<Medico> medicos);
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.especializacoes esp WHERE "
			+ "(COALESCE(:especializacoes) IS NULL OR esp IN :especializacoes) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> findEspecializacoes(List<Especializacao> especializacoes, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.especializacoes WHERE obj IN :medicos")
	List<Medico> findEspecializacoes(List<Medico> medicos);
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.atendimentos a WHERE "
			+ "(COALESCE(:atendimentos) IS NULL OR a IN :atendimentos) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> findAtendimento(List<Atendimento> atendimentos, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.atendimentos WHERE obj IN :medicos")
	List<Medico> findAtendimento(List<Medico> medicos);

}