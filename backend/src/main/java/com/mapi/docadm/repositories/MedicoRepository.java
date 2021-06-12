package com.mapi.docadm.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.entities.Medico;

@Repository
public interface MedicoRepository extends JpaRepository<Medico, Long> {
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.especialidades esp WHERE "
			+ "(COALESCE(:especialidades) IS NULL OR esp IN :especialidades) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> find(List<Especialidade> especialidades, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.especialidades WHERE obj IN :medicos")
	List<Medico> find(List<Medico> medicos);

}