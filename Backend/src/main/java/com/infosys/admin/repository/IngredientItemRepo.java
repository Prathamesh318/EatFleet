package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.IngredientsItem;

@Repository
public interface IngredientItemRepo extends JpaRepository<IngredientsItem, Long> {
	List<IngredientsItem> findByRestaurantId(Long id);
}
