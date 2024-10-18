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
	
	@GetMapping("/food/restaurant/{id}")
	ResponseEntity<List<Food>> searchFood(@RequestParam (required = false)boolean vegeterian
										,@RequestParam (required = false)boolean nonveg
										,@RequestParam (required = false)boolean seasonal
										,@RequestParam (required=false)Long category
										,@PathVariable Long id
										,@RequestHeader("Authorization") String jwt)throws Exception{
		
//		User user=userService.findUserByJwtToken(jwt);
		System.out.println("Called");
		System.out.println("Restaurant id is"+id);
//		System.out.println("Category"+category);
		
		
		
		List<Food> food=foodService.getrestaurantsFood(id,vegeterian,nonveg,seasonal,category);
		System.out.println("Food of the restaurant is"+food);
		for(int i=0;i<food.size();i++) {
			System.out.println("Food"+food.get(i));
		}
		return new  ResponseEntity<>(food,HttpStatus.FOUND);
	}

}
