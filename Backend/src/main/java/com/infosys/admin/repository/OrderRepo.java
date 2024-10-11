package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.admin.Model.Order;

public interface OrderRepo extends JpaRepository<Order, Long> {

	
	public List<Order>findByCustomerId(Long customerId);
	
	public List<Order>findByRestaurantId(Long restaurantId);
}
