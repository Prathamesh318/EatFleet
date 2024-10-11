package com.infosys.admin.Request;

import lombok.Data;

@Data
public class IngredientRequest {
	
	private Long restaurantId;
	private String name;
	private Long categoryId;
	

}
