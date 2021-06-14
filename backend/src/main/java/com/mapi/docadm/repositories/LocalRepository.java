package com.mapi.docadm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.Local;

@Repository
public interface LocalRepository extends JpaRepository<Local, Long> {

}
