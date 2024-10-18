package com.infosys.admin.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class IngredientsItem {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private Long id;
		
		private String name;
		
		
		@ManyToOne
		@ToString.Exclude
		private	IngredientCategory category;
		
		
		@ManyToOne
		@JsonIgnore
		private Restaurant restaurant;
		
		private boolean inStock=true;
}

