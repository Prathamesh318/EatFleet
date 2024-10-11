package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.Food;


@Repository
public interface FoodRepo extends JpaRepository<Food, Long>{

	
	
	List<Food>findByRestaurantId(Long restaurantId);
	
	
	@Query("Select F from Food F where F.name like %:keyword% OR F.foodCategory.name like %:keyword%")
	List<Food>searchFood(@Param("keyword")String keyword);
}
