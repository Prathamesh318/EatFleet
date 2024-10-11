package com.infosys.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Order;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.OrderRequest;
import com.infosys.admin.service.OrderService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminOrderController {
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private UserService userService;
	

	@GetMapping("/order/restaurant/{id}")
	public ResponseEntity<	List<Order>>getOrderhistory(
			@PathVariable Long id,
			@RequestParam(required = false)String order_status,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		User user=this.userService.findUserByJwtToken(jwt);
		List<Order> order=orderService.getRRestaurantOrder(id,order_status);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
		}
	
	

	@PutMapping("/order/{orderId}/{orderStatus}")
	public ResponseEntity<	Order>updateOrderStatus(
			@PathVariable Long orderId,
			@PathVariable String orderStatus,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
//		User user=this.userService.findUserByJwtToken(jwt);
		Order order=orderService.updateOrder(orderId,orderStatus);
		
		return new ResponseEntity<>(order,HttpStatus.OK);
		}
}