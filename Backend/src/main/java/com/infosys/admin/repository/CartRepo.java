package com.infosys.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.Cart;

@Repository
public interface CartRepo  extends JpaRepository<Cart, Long>{

	
	
	public Cart findByCustomerId(Long userId);
}
