package com.infosys.admin.Request;

import java.util.List;

import com.infosys.admin.Model.Address;
import com.infosys.admin.Model.ContactInformation;

import lombok.Data;

@Data
public class CreateRestaurantRequest {
	
	private Long id;
	private String name;
	private String description;
	private String cuisuineType;
	private Address address;
	private ContactInformation contactInformation;
	
	private String openingHours;
	private	List<String> images;
}
