package com.infosys.admin.Request;

import com.infosys.admin.Model.Address;

import lombok.Data;

@Data
public class OrderRequest {
	
	
	private Long restaurantId;
	
	private Address deliveryAddress;
	
	
	

}
