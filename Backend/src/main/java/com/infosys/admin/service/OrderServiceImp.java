package com.infosys.admin.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Address;
import com.infosys.admin.Model.Cart;
import com.infosys.admin.Model.CartItem;
import com.infosys.admin.Model.Order;
import com.infosys.admin.Model.OrderItem;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.OrderRequest;
import com.infosys.admin.repository.AddressRepo;
import com.infosys.admin.repository.OrderItemRepo;
import com.infosys.admin.repository.OrderRepo;
import com.infosys.admin.repository.UserRepo;


@Service
public class OrderServiceImp  implements OrderService{
	@Autowired
	private OrderRepo orderRepo;
	
	
	@Autowired
	private OrderItemRepo orderItemRepo;

	@Autowired
	private AddressRepo addressRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private RestaurantService restoService;
	
	@Autowired
	private CartService cartService;
	@Override
	public Order createOrder(OrderRequest order, User user)throws Exception {
		// TODO Auto-generated method stub
		Address shippAddress=order.getDeliveryAddress();
		
		Address savedAddress=addressRepo.save(shippAddress);
		if(!user.getAddresses().contains(savedAddress)) {
			user.getAddresses().add(savedAddress);
			
			userRepo.save(user);
		}
		
		Restaurant restaurant=restoService.findRestaurantById(order.getRestaurantId());
		
		Order createdOrder=new Order();
		
		createdOrder.setCreatedAt(new Date());
		createdOrder.setRestaurant(restaurant);
		createdOrder.setCustomer(user);
		createdOrder.setDeliveryAddress(savedAddress);
		createdOrder.setOrderStatus("PENDING");
		
		Cart cart=cartService.findCartByUserid(user.getId());
		
		List<OrderItem>orderItems=new ArrayList<OrderItem>();
		
		for(CartItem cartItem:cart.getItem()) {
			OrderItem item=new OrderItem();
			item.setFood(cartItem.getFood());
			item.setIngredients(cartItem.getIngredients());
			item.setQuantity(cartItem.getQuantity());
			item.setTotalPrice(cartItem.getTotalPrice());
			
			OrderItem savedOrderItem=orderItemRepo.save(item);
			
			orderItems.add(savedOrderItem);
		}
		
		Long totalPrice=cartService.calculateCartTotals(cart);
		createdOrder.setItems(orderItems);
		createdOrder.setTotalAmount(totalPrice);
		
		
		Order savedOrder=orderRepo.save(createdOrder);
		restaurant.getOrders().add(savedOrder);
		
		
		
		return createdOrder;
	}

	@Override
	public Order updateOrder(Long orderId, String orderStatus) throws Exception {
		// TODO Auto-generated method stub
		
		Order order=orderRepo.findById(orderId).get();
		if(orderStatus.equals("OUT_FOR_DELIVERY")
				|| orderStatus.equals("DELIVERED")
				||orderStatus.equals("PENDING")
				||orderStatus.equals("COMPLETED")) {
		
			order.setOrderStatus(orderStatus);
			return orderRepo.save(order);
		}
		throw new  Exception("Please select a valid order status");
	}

	@Override
	public void cancelOrder(Long orderId) throws Exception {
		// TODO Auto-generated method stub
		Order order=findOrderById(orderId);
		
		orderRepo.deleteById(orderId);
		
	}

	@Override
	public List<Order> getUserOrder(Long userId) throws Exception {
		// TODO Auto-generated method stub
		
		 
	
		return orderRepo.findByCustomerId(userId);
	}

	@Override
	public List<Order> getRRestaurantOrder(Long restaurantId, String orderStatus) throws Exception {
		// TODO Auto-generated method stub
		List<Order> orders= orderRepo.findByRestaurantId(restaurantId);
		if(orderStatus!=null) {
			orders=orders.stream().filter(order->order.getOrderStatus().equals(orderStatus)).collect(Collectors.toList());
		}
		
		return orders;
	}

	@Override
	public Order findOrderById(Long id) throws Exception {
		// TODO Auto-generated method stub
		Order order=this.orderRepo.findById(id).get();
		if(order==null) {
			throw new Exception("Ordernot found");
		}
		return order;
	}

}
