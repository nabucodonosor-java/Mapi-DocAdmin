package com.mapi.docadm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Especializacao;

@Repository
public interface EspecializacaoRepository extends JpaRepository<Especializacao, Long> {

}
