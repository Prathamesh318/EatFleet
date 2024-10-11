package com.infosys.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.infosys.admin.Model.Restaurant;

@Repository
public interface RestoRepo extends JpaRepository<Restaurant, Long>{
	
	Restaurant findByOwnerId(Long userId);

	@Query("SELECT r FROM Restaurant r WHERE lower(r.name)"
			+ " LIKE lower(concat('%',:query,'%')) OR lower(r.cuisineType) LIKE lower(concat('%',:query,'%'))")
	List<Restaurant>findBySearchQuery(String query);

}
