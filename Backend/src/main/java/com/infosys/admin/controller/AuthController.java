package com.infosys.admin.controller;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Cart;
import com.infosys.admin.Model.USER_ROLE;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.LoginRequest;
import com.infosys.admin.config.JwtProvider;
import com.infosys.admin.repository.CartRepo;
import com.infosys.admin.repository.UserRepo;
import com.infosys.admin.response.AuthResponse;
import com.infosys.admin.service.CustomUserDetailsService;

@RestController
@RequestMapping("/auth")
public class AuthController {
	
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomUserDetailsService customUserDetailsService;
	@Autowired
	private CartRepo cartRepo;
	
	
	@PostMapping("/signup")
	public ResponseEntity<AuthResponse> createUserHandler(@RequestBody User user){
		
		User isEmailExist=userRepo.findByEmail(user.getEmail());
		if(isEmailExist!=null) {
			throw new BadCredentialsException("Email already exist with another account");
		}
		User createdUser=new User();
		createdUser.setEmail(user.getEmail());
		createdUser.setFullName(user.getFullName());
		createdUser.setRole(user.getRole());
		createdUser.setPassword(passwordEncoder.encode(user.getPassword()));
		
		User savedUser=this.userRepo.save(createdUser);
		
		
		Cart cart=new Cart();
		cart.setCustomer(savedUser);
		cartRepo.save(cart);
		
		Authentication authentication=new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword());
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		String jwt=jwtProvider.generateString(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		authResponse.setMessage("Registered Successfully");
		authResponse.setJwt(jwt);
		authResponse.setRole(savedUser.getRole());
		
		System.out.println(user);
		
		return new ResponseEntity<>(authResponse,HttpStatus.CREATED);
		
	}
	
	@PostMapping("/signin")
	public ResponseEntity<AuthResponse> signIn(@RequestBody LoginRequest req){
		
		String username=req.getEmail();
		String password=req.getPassword();
		
		Authentication authentication=authenticate(username,password);
		
		String jwt=jwtProvider.generateString(authentication);
		
		AuthResponse authResponse=new AuthResponse();
		
		Collection<? extends GrantedAuthority> authorities=authentication.getAuthorities();
		
		String role=authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
		authResponse.setMessage("Logged In Successfully");
		authResponse.setJwt(jwt);
		authResponse.setRole(USER_ROLE.valueOf(role));
		
		return new ResponseEntity<>(authResponse,HttpStatus.OK); 
		
	}

	private Authentication authenticate(String username, String password) {
		// TODO Auto-generated method stub
		
		UserDetails userDetails=customUserDetailsService.loadUserByUsername(username);
		
		if(userDetails==null) {
			throw new BadCredentialsException("Invalid username..");
			
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid password");
		}
		
		return new UsernamePasswordAuthenticationToken(userDetails, null,userDetails.getAuthorities());
	}
}
