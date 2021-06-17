package com.mapi.docadm.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Especializacao;

@Repository
public interface EspecializacaoRepository extends JpaRepository<Especializacao, Long> {
	
	@Query("SELECT obj FROM Especializacao obj WHERE (LOWER(obj.nome) LIKE LOWER(CONCAT('%',:nome,'%'))) ")
	Page<Especializacao> find(String nome, Pageable pageable);

}
