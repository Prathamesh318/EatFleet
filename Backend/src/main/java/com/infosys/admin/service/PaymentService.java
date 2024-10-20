package com.infosys.admin.service;

import com.infosys.admin.Model.Order;
import com.infosys.admin.response.PaymentResponse;

//import org.springframework.data.jpa.repository.JpaRepository;
public interface PaymentService {
	
	
	
	public PaymentResponse createPaymentLink(Order order);
	
	
}


