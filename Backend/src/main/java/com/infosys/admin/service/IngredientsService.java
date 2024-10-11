package com.infosys.admin.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.infosys.admin.Model.IngredientCategory;
import com.infosys.admin.Model.IngredientsItem;



@Service
public interface IngredientsService {
	
	
	public IngredientCategory createIngredientCategory(String name,Long restaurantId)throws Exception;
	
	public IngredientCategory findIngredientCategory(Long id)throws Exception;
	
	public List<IngredientCategory> findIngredientCategoryByRestaurantId(Long id)throws Exception;
	
	public IngredientsItem createIngredientItem(Long id,String ingredientName,Long ingredientCategoryId)throws Exception;
	
	public List<IngredientsItem> findRestaurantIngredients(Long restaurantId)throws Exception;
	
	public IngredientsItem updatestock(Long id)throws Exception;
	

}
