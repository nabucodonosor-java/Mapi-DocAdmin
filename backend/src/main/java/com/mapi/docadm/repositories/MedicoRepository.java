package com.mapi.docadm.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Atendimento;
import com.mapi.docadm.entities.Cidade;
import com.mapi.docadm.entities.Especialidade;
import com.mapi.docadm.entities.Especializacao;
import com.mapi.docadm.entities.Local;
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
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.atendimentos atend WHERE "
			+ "(COALESCE(:atendimentos) IS NULL OR atend IN :atendimentos) AND "
			+ "(LOWER(obj.cidade) LIKE LOWER(CONCAT('%',:cidade,'%'))) ")
	Page<Medico> findAtendimentos(List<Atendimento> atendimentos, String cidade, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.atendimentos WHERE obj IN :medicos")
	List<Medico> findAtendimentos(List<Medico> medicos);
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.cidades c WHERE "
			+ "(COALESCE(:cidades) IS NULL OR c IN :cidades) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> findCidades(List<Cidade> cidades, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.cidades WHERE obj IN :medicos")
	List<Medico> findCidades(List<Medico> medicos);
	
	@Query("SELECT DISTINCT obj FROM Medico obj INNER JOIN obj.locais local WHERE "
			+ "(COALESCE(:locais) IS NULL OR local IN :locais) AND "
			+ "(LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Medico> findLocais(List<Local> locais, String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Medico obj JOIN FETCH obj.locais WHERE obj IN :medicos")
	List<Medico> findLocais(List<Medico> medicos);

	
	

}