package com.infosys.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Food;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.CreateFoodRequest;
import com.infosys.admin.response.MessageResponse;
import com.infosys.admin.service.FoodService;
import com.infosys.admin.service.RestaurantService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api/admin/food")
public class AdminFoodController {
	@Autowired
	private FoodService foodService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private RestaurantService restoService;
	
	
	
	@PostMapping
	public ResponseEntity<Food>createFood(@RequestBody CreateFoodRequest req
				,@RequestHeader("Authorization") String jwt
			) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		System.out.println("Category Created----------");
		
		System.out.println("Inngredients are"+req.getItems());
		
		Restaurant restaurant=restoService.findRestaurantById(req.getRestaurantId());
		System.out.println(restaurant.toString());
		
		Food food=foodService.createFood(req, req.getCategory(), restaurant);
		
		return new ResponseEntity<Food>(food,HttpStatus.CREATED);
	}
	@DeleteMapping("{id}")
	public ResponseEntity<MessageResponse>deleteFood(@PathVariable Long id
				,@RequestHeader("Authorization") String jwt
			) throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		
		MessageResponse res=new MessageResponse();
		res.setMessage("Food successfully deleted");
		
		foodService.deleteFood(id);
		
		return new ResponseEntity<>(res,HttpStatus.OK);
	}
	@PutMapping("{id}")
	public ResponseEntity<Food>updateFoodAvailability(@PathVariable Long id
				,@RequestHeader("Authorization") String jwt
			) throws Exception{
//		
//		User user=userService.findUserByJwtToken(jwt);
		

		
		Food food=foodService.updateAvailabilityStatus(id);
		
		return new ResponseEntity<>(food,HttpStatus.OK);
	}
}
