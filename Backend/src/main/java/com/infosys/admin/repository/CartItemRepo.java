package com.infosys.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.CartItem;


@Repository
public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
