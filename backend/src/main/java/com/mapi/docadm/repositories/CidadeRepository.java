package com.mapi.docadm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Cidade;

@Repository
public interface CidadeRepository extends JpaRepository<Cidade, Long> {
	
	@Query("SELECT obj FROM Cidade obj WHERE (LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Cidade> findNome(String nome, Pageable pageable);
	
}
