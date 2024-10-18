package com.infosys.admin.Request;

import org.hibernate.annotations.GeneratorType;

import jakarta.persistence.Id;
import lombok.Data;

@Data
public class IngredientRequest {
	
	private Long restaurantId;
	private String name;
	
	private Long categoryId;
	

}
