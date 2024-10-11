package com.infosys.admin.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Model.RestaurantDto;
import com.infosys.admin.Model.User;

import com.infosys.admin.service.RestaurantService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {
	@Autowired
	private RestaurantService restaurantService;
	
	@Autowired
	private UserService userService;
	
	
	@GetMapping("/search")
	public ResponseEntity<List<Restaurant>> searchRestaurant(@RequestParam String keyword,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		List<Restaurant> restaurant=restaurantService.searchRestaurant(keyword);
		
		return new ResponseEntity<>(restaurant,HttpStatus.OK);
		
	}
	@GetMapping()
	public ResponseEntity<List<Restaurant>> getAllRestaurant(
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		List<Restaurant> restaurant=restaurantService.getAllRestaurant();
		
		return new ResponseEntity<>(restaurant,HttpStatus.OK);
		
	}
	@GetMapping("/{id}")
	public ResponseEntity<Restaurant> findRestaurantById(@PathVariable Long id,
			@RequestHeader("Authorization") String jwt) throws Exception{
		User user=userService.findUserByJwtToken(jwt);
		Restaurant restaurant=restaurantService.findRestaurantById(id);
		
		return new ResponseEntity<>(restaurant,HttpStatus.OK);
		
	}
	
	@PutMapping("/{id}/add-favourite")
	public ResponseEntity<RestaurantDto>addToFav(
				@RequestHeader("Authorization")String jwt,
				@PathVariable Long id
			)throws Exception{
		User user=userService.findUserByJwtToken(jwt);
			RestaurantDto restaurant=restaurantService.addToFavorites(id, user);
			
		return new ResponseEntity<RestaurantDto>(restaurant,HttpStatus.OK);
	}
}
