package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.infosys.admin.Model.IngredientCategory;

public interface IngredientCategoryRepo extends JpaRepository<IngredientCategory,Long>{
	
		List<IngredientCategory>findByRestaurantId(long id);
}
