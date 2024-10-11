package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.Category;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {
	
	
	public List<Category>findByRestaurantId(Long id);
}
