package com.infosys.admin.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Category;
import com.infosys.admin.Model.Food;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Request.CreateFoodRequest;
import com.infosys.admin.repository.FoodRepo;


@Service
public class FoodServiceImp implements FoodService {
	
	@Autowired
	private FoodRepo foodRepo;
	@Override
	public Food createFood(CreateFoodRequest req, Category cat, Restaurant res) {
		// TODO Auto-generated method stub
		
		Food food=new Food();
		food.setFoodCategory(req.getCategory());
		food.setDescription(req.getDescription());
		food.setName(req.getName());
		food.setPrice(req.getPrice());
		food.setRestaurant(res);
		food.setImages(req.getImages());
		food.setIngredients(req.getItems());
		food.setSeasonal(req.isSeasonal());
		food.setVeg(req.isVegeterian());
		food.setCreationDate(new Date());
		Food savedFood= foodRepo.save(food);
		
		res.getFoods().add(savedFood);
		
		
		return savedFood;
	}

	@Override
	public void deleteFood(Long foodId) throws Exception {
		// TODO Auto-generated method stub
		
		Food food=findByFoodById(foodId);
		food.setRestaurant(null);
		foodRepo.save(food);
		
	
	}

	@Override
	public List<Food> getrestaurantsFood(Long restaurantId, boolean isVeg,boolean isNonveg, boolean isSeasonal
			,Long id
			) {
		
		System.out.println("Called in function");
//		System.out.println("--"+category);
		List<Food> food=new ArrayList<Food>();

		try {food =foodRepo.findByRestaurantId(restaurantId);
		
		}
		catch(Exception e) {
			e.printStackTrace();
		}
		
		if(isVeg) {
			food=filterByVegeterian(food,isVeg);
		}
		if(isNonveg) {
			food=filterByNonVeg(food,isNonveg);
		}
		if(isSeasonal) {
			food=filterBySeasonal(food,isSeasonal);
			
		}
		if(id>0) {
			food=filterByCategory(food,id);
			
		}
		
		
		return food;
	}

	private List<Food> filterByCategory(List<Food> foods, Long categoryId) {
		// TODO Auto-generated method stub
		 return foods.stream().filter(food->{
			if(food.getFoodCategory()!=null) {
				return food.getFoodCategory().getId().equals(categoryId);
			}
			return false;
		}).collect(Collectors.toList());
	}

	private List<Food> filterBySeasonal(List<Food> food, boolean isSeasonal) {
		// TODO Auto-generated method stub
		return food.stream().filter(foods->foods.isSeasonal()==isSeasonal).collect(Collectors.toList());
	}

	private List<Food> filterByNonVeg(List<Food> food, boolean isNonveg) {
		// TODO Auto-generated method stub
		return food.stream().filter(foods->foods.isVeg()==false).collect(Collectors.toList());
	}

	private List<Food> filterByVegeterian(List<Food> food, boolean isVeg) {
		// TODO Auto-generated method stub
		return food.stream().filter(foodd->foodd.isVeg()==isVeg).collect(Collectors.toList());
	}
	
	 

	@Override
	public List<Food> searchFood(String keyword) {
		// TODO Auto-generated method stub
		return foodRepo.searchFood(keyword);
	}

	@Override
	public Food findByFoodById(Long foodId) throws Exception {
		// TODO Auto-generated method stub
		Food food=foodRepo.findById(foodId).get();
		if(food==null) {
			throw new Exception("Food does not exist");
		}
		return food;
	}

	@Override
	public Food updateAvailabilityStatus(Long foodId) throws Exception {
		// TODO Auto-generated method stub
		Food food=findByFoodById(foodId);
		food.setAvailable(!food.isAvailable());
		return foodRepo.save(food);
	}

}
