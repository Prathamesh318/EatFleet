package com.infosys.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Food;
import com.infosys.admin.Model.User;
import com.infosys.admin.service.FoodService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api")
public class FoodController {
	
	
	@Autowired
	UserService userService;
	
	@Autowired
	FoodService foodService;
	
	
	@GetMapping("/search")
	ResponseEntity<List<Food>> searchFood(@RequestParam String name,@RequestHeader("Authorization") String jwt)throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		
		
		List<Food> food=foodService.searchFood(jwt);
		return new  ResponseEntity<>(food,HttpStatus.FOUND);
	}
	
	@GetMapping("/restaurant/{id}")
	ResponseEntity<List<Food>> searchFood(@RequestParam boolean veg
										,@RequestParam boolean seasonal
										,@RequestParam boolean nonveg
										,@RequestParam String category
										,@PathVariable Long restaurantId
										,@RequestHeader("Authorization") String jwt)throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		
		
		List<Food> food=foodService.getrestaurantsFood(restaurantId,veg,nonveg,seasonal,category);
		return new  ResponseEntity<>(food,HttpStatus.FOUND);
	}

}
