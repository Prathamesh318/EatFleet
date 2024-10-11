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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.IngredientCategory;
import com.infosys.admin.Model.IngredientsItem;
import com.infosys.admin.Request.IngredientCategoryRequest;
import com.infosys.admin.Request.IngredientRequest;
import com.infosys.admin.service.IngredientsService;

@RestController
@RequestMapping("/api/admin/ingredients")
public class IngredientController {
	
	@Autowired
	private IngredientsService ingredientservice;
	
	
	
	@PostMapping("category")
	public ResponseEntity<IngredientCategory> createIngredientCategory(@RequestBody IngredientCategoryRequest req)throws Exception{
		
		IngredientCategory item=ingredientservice.createIngredientCategory(req.getName(), req.getRestaurantid());
		
		
		
		return new ResponseEntity<IngredientCategory>(item,HttpStatus.CREATED);
		
		
	}
	

	@PostMapping()
	public ResponseEntity<IngredientsItem> createIngredientItem(@RequestBody IngredientRequest req)throws Exception{
		
		IngredientsItem item=ingredientservice.createIngredientItem( req.getRestaurantId(),req.getName(),req.getCategoryId());
		
		return new ResponseEntity<>(item,HttpStatus.CREATED);
		
		
	}
	@PutMapping("/{id}/stock")
	public ResponseEntity<IngredientsItem> updateStock(@PathVariable Long id)throws Exception{
		
		IngredientsItem item=ingredientservice.updatestock( id);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
		
		
	}
	
	@GetMapping("/restaurant/{id}")
	public ResponseEntity<List<IngredientsItem>> restaurantIngredients(@PathVariable Long id)throws Exception{
		
		List<IngredientsItem> item=ingredientservice.findRestaurantIngredients( id);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
		
		
	}
	
	@GetMapping("/restaurant/{id}/category")
	public ResponseEntity<List<IngredientCategory>> getrestaurantIngredientsCategory(@PathVariable Long id)throws Exception{
		
		List<IngredientCategory> item=ingredientservice.findIngredientCategoryByRestaurantId(id);
		
		return new ResponseEntity<>(item,HttpStatus.OK);
		
		
	}
	
	
}
