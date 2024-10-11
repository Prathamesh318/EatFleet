package com.infosys.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.User;
import com.infosys.admin.service.UserServiceImp;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	
	@Autowired
	private UserServiceImp userService;
	
	
	@GetMapping("/profile")
	public ResponseEntity<User> findUserByJwtToken(@RequestHeader("Authorization") String jwt)
	{	
		
		User user=null;
//		String mainJwt=jwt.substring(7);
		try {
			user=userService.findUserByJwtToken(jwt);
		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		
		return new ResponseEntity<>(user,HttpStatus.OK);
	}
}
