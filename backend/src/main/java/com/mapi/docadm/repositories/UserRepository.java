package com.mapi.docadm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mapi.docadm.entities.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	User findByEmail(String email); 

}