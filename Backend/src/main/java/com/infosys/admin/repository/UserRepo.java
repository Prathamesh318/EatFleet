package com.infosys.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.User;


@Repository
public interface UserRepo extends JpaRepository<User, Long>{
	
	
	public User findByEmail(String email);

}
