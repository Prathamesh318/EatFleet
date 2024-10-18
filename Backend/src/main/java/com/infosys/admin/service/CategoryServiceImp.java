package com.infosys.admin.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Category;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.repository.CategoryRepo;


@Service
public class CategoryServiceImp implements CategoryService {

	@Autowired
	private CategoryRepo categoryRepo;
	@Autowired
	private RestaurantService restaurantService;
	@Override
	public Category createCategory(String name, Long userId) throws Exception {
		// TODO Auto-generated method stub
		
		Restaurant restuarant=restaurantService.getRestaurantByUserId(userId);
		Category category=new Category();
		category.setName(name);
		category.setRestaurant(restuarant);
		return categoryRepo.save(category);
	}

	@Override
	public List<Category> findCategoryByRestaurant(Long id) throws Exception {
		// TODO Auto-generated method stub
//		Restaurant restaurant=restaurantService.getRestaurantByUserId(id);
		 return categoryRepo.findByRestaurantId(id);
	}

	@Override
	public Category findCategoryById(Long id) throws Exception {
		// TODO Auto-generated method stub
		Category category=categoryRepo.findById(id).get();
		if(category==null) throw new Exception("No category with id :"+id);
		return category;
	}

}
