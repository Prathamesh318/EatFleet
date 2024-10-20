package com.infosys.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.infosys.admin.Model.Order;
import com.infosys.admin.Model.User;

import com.infosys.admin.Request.OrderRequest;
import com.infosys.admin.response.PaymentResponse;
import com.infosys.admin.service.OrderService;
import com.infosys.admin.service.PaymentService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api")
public class OrderController {
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	
	
	@Autowired
	private PaymentService paymentservice;
	

	@PostMapping("/order")
	public ResponseEntity<PaymentResponse>createOrder(@RequestBody OrderRequest req,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		User user=this.userService.findUserByJwtToken(jwt);
		Order order=orderService.createOrder(req, user);
		
		PaymentResponse res=paymentservice.createPaymentLink(order);
		
		return new ResponseEntity<>(res,HttpStatus.CREATED);
		
	}
	@GetMapping("/order/user")
	public ResponseEntity<	List<Order>>getOrderhistory(
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		User user=this.userService.findUserByJwtToken(jwt);
		List<Order> order=orderService.getUserOrder(user.getId());
		
		return new ResponseEntity<>(order,HttpStatus.CREATED);
		
	}
	
	
}
