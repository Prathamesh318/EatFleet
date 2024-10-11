package com.infosys.admin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
public class FoodOrdering {

	public static void main(String[] args) {
		SpringApplication.run(FoodOrdering.class, args);
	}

}
