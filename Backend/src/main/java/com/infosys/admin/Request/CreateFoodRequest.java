package com.infosys.admin.Request;

import java.util.List;

import com.infosys.admin.Model.Category;
import com.infosys.admin.Model.IngredientsItem;

import lombok.Data;

@Data
public class CreateFoodRequest {
		
		private String name;
		private String description;
		private Long price;
		
		private Category category;
		private List<String> images;
		
		private Long restaurantId;
		private boolean vegeterian;
		private boolean seasonal;
		private List<IngredientsItem>items;
}
