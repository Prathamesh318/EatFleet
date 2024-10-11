package com.infosys.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.IngredientCategory;
import com.infosys.admin.Model.IngredientsItem;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.repository.IngredientCategoryRepo;
import com.infosys.admin.repository.IngredientItemRepo;

@Service
public class IngredientServiceImp implements IngredientsService{
	
	
	@Autowired
	IngredientCategoryRepo ingredientCategoryRepo;
	
	@Autowired
	IngredientItemRepo ingredientItemRepo;
	
	@Autowired
	RestaurantService restuarantService;
	@Override
	public IngredientCategory createIngredientCategory(String name, Long restaurantId) throws Exception {
		// TODO Auto-generated method stub
		IngredientCategory category=new IngredientCategory();
		Restaurant restaurant=restuarantService.findRestaurantById(restaurantId);
//		IngredientsItem items=ingredientItemRepo.find
		category.setName(name);
		category.setRestaurant(restaurant);
		
		return ingredientCategoryRepo.save(category);
	}

	@Override
	public IngredientCategory findIngredientCategory(Long id) throws Exception {
		// TODO Auto-generated method stub
		IngredientCategory categories=ingredientCategoryRepo.findById(id).get();
		if(categories==null) {
			throw new Exception("Ingredient Category not fouund");
		}
		return categories;
	}

	@Override
	public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id) throws Exception {
		// TODO Auto-generated method stub
		Restaurant restaurant=restuarantService.findRestaurantById(id);
		if(restaurant==null) throw new Exception("Restaurant not found with id"+id);
	
		
		return ingredientCategoryRepo.findByRestaurantId(id);
	}

	@Override
	public IngredientsItem createIngredientItem(Long restaurantId, String ingredientName, Long ingredientCategoryId)
			throws Exception {
		// TODO Auto-generated method stub
		Restaurant restaurant=restuarantService.findRestaurantById(restaurantId);
		
		IngredientsItem item=new IngredientsItem();
		
		IngredientCategory category=findIngredientCategory(ingredientCategoryId);
		item.setName(ingredientName);
		item.setRestaurant(restaurant);
		item.setCategory(category);
		IngredientsItem savedItem=ingredientItemRepo.save(item);
		category.getIngredients().add(savedItem);
		return savedItem;
	}

	@Override
	public List<IngredientsItem> findRestaurantIngredients(Long restaurantId) throws Exception {
		
		// TODO Auto-generated method stub
		
		return ingredientItemRepo.findByRestaurantId(restaurantId);
	}

	@Override
	public IngredientsItem updatestock(Long id) throws Exception {
		// TODO Auto-generated method stub
		
		IngredientsItem item=ingredientItemRepo.findById(id).get();
		if(item==null) throw new Exception("Ingredient not found");
		item.setInStock(!item.isInStock());
		
		return ingredientItemRepo.save(item);
	}

}
