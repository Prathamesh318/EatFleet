package com.infosys.admin.config;

import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.crypto.SecretKey;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Service
public class JwtProvider {
	
	private SecretKey key=Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
	
	public String generateString(Authentication auth) {
		Collection<? extends GrantedAuthority> authorities=auth.getAuthorities();
		String roles=populateAuthorities(authorities);
		  Date issuedAt = new Date();
	        Date expirationDate = new Date(issuedAt.getTime() + 86400000); // 24 hours later

	        String expirationDateString = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSZ").format(expirationDate);
		
		String jwt=Jwts.builder().setIssuedAt(new Date())
				.setExpiration(expirationDate)
				.claim("email", auth.getName())
				.claim("authorities",roles)
				.signWith(key)
				.compact();
		
		return jwt;
				
	}

	
	public String getEmailFromJwtToken(String jwt) {
		jwt=jwt.substring(7);
		Claims claims=Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();
		
		String email=String.valueOf(claims.get("email"));
		
		return email;
	}
	
	private String populateAuthorities(Collection<? extends GrantedAuthority> authorities) {
		// TODO Auto-generated method stub
		
		Set<String>auths=new HashSet<>();
		
		for(GrantedAuthority authority:authorities) {
			auths.add(authority.getAuthority());
		}
		 
		return String.join(",", auths);
		
	}

}
