package com.infosys.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Model.RestaurantDto;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.CreateRestaurantRequest;

@Service
public interface RestaurantService {
	
	public Restaurant createRestaurant(CreateRestaurantRequest req,User user) ;
	
	public Restaurant updateRestaurant(Long restaurantid,CreateRestaurantRequest req)throws Exception;
	
	public void deleteRestaurant(Long restaurantId)throws Exception;
	
	public List<Restaurant>getAllRestaurant();
	
	public List<Restaurant>searchRestaurant(String s);
	
	public Restaurant findRestaurantById(Long restaurantid)throws Exception;
	
	public Restaurant getRestaurantByUserId(Long userId)throws Exception;
	
	public RestaurantDto addToFavorites(Long restaurantId,User user)throws Exception;
	
	public Restaurant updaterestaurantStatus(Long restaurantId)throws Exception;
	
}
