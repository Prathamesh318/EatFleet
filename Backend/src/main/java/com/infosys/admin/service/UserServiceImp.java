package com.infosys.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.User;
import com.infosys.admin.config.JwtProvider;
import com.infosys.admin.repository.UserRepo;

@Service
public class UserServiceImp implements UserService {
	
	@Autowired
	private UserRepo repo;
	
	@Autowired
	private JwtProvider jwtProvide;
	@Override
	public User findUserByJwtToken(String jwt) throws Exception {
		// TODO Auto-generated method stub
		String email=jwtProvide.getEmailFromJwtToken(jwt);
		
		User user=this.repo.findByEmail(email);
		return user;
	}

	@Override
	public User findUserByEmail(String email) throws Exception {
		// TODO Auto-generated method stub
		
		User user=this.repo.findByEmail(email);
		
		if(user==null) {
			throw new BadCredentialsException("User not found");
		}
		return user;
	}

}
