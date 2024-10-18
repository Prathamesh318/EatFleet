package com.infosys.admin.service;

import java.util.List;

import com.infosys.admin.Model.Category;
import com.infosys.admin.Model.Food;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Request.CreateFoodRequest;

public interface FoodService {
	
	
	public Food createFood(CreateFoodRequest req,Category cat,Restaurant res);
	public void deleteFood(Long foodId) throws Exception;
	public List<Food> getrestaurantsFood(Long restaurantId
				,boolean isVeg
				,boolean isNonveg
				,boolean isSeasonal
				,Long id
				);
	
	public List<Food> searchFood(String keyword);
	
	public Food findByFoodById(Long foodId) throws Exception;
	
	public Food updateAvailabilityStatus(Long foodId)throws Exception;
	

}
