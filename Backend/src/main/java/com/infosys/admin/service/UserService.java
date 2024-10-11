package com.infosys.admin.service;

import com.infosys.admin.Model.User;

public interface UserService {
	
	
	public User findUserByJwtToken(String jwt) throws Exception;
	
	public User findUserByEmail(String email) throws Exception;

}
