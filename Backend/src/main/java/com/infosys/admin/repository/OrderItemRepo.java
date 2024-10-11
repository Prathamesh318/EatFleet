package com.infosys.admin.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.admin.Model.OrderItem;

public interface OrderItemRepo extends JpaRepository<OrderItem, Long> {

}
