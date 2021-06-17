package com.mapi.docadm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Local;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {
	
	@Query("SELECT obj FROM Local obj WHERE (LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Local> findNome(String nome, Pageable pageable);
	
	@Query("SELECT obj FROM Local obj WHERE (LOWER(obj.logradouro) LIKE LOWER(CONCAT('%',:logradouro,'%'))) ")
	Page<Local> findLogradouro(String logradouro, Pageable pageable);

	@Query("SELECT obj FROM Local obj WHERE (LOWER(obj.localidade) LIKE LOWER(CONCAT('%',:localidade,'%'))) ")
	Page<Local> findLocalidade(String localidade, Pageable pageable);

}
