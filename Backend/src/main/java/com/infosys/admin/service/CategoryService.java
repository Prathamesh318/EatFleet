package com.infosys.admin.service;

import java.util.List;

import com.infosys.admin.Model.Category;

public interface CategoryService {
	
	
	public Category createCategory(String name,Long userId)throws Exception;
	public List<Category>findCategoryByRestaurant(Long id) throws Exception;
	
	public Category findCategoryById(Long id)throws Exception;

}
