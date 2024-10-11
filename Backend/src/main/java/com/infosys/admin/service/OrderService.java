package com.infosys.admin.service;

import java.util.List;

import com.infosys.admin.Model.Order;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.OrderRequest;

public interface OrderService {
	
	
	public Order createOrder(OrderRequest order,User user)throws Exception;
	
	public Order updateOrder(Long orderId,String orderStatus)throws Exception;

	public void cancelOrder(Long orderId)throws Exception;
	
	public List<Order> getUserOrder(Long userId)throws Exception;
	
	public List<Order>getRRestaurantOrder(Long restaurantId,String orderStatus)throws Exception;
	
	public Order findOrderById(Long id)throws Exception;
	
}
