package com.infosys.admin.config;

import java.util.Arrays;
import java.util.Collections; 

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;


//import io.jsonwebtoken.lang.Collections;
import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
public class AppConfig {
	
	
	@Bean
	SecurityFilterChain securityfilterChain(HttpSecurity http) throws Exception{
		
		http.sessionManagement(management->management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(Authorize->Authorize
				.requestMatchers("/api/admin/**")
				.hasAnyRole("RESTAURANT_OWNER","ADMIN","PRATHAMESH")
				.requestMatchers("/api/**").authenticated()
				.anyRequest().permitAll()
				).addFilterBefore(new JwtTokenValidator(),BasicAuthenticationFilter.class)
				.csrf(csrf->csrf.disable())
				.cors(cors->cors.configurationSource(corsConfigurationSource()));
			
		
		return http.build();
	}
	
	
	private CorsConfigurationSource corsConfigurationSource() {
		
		return new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				
				// TODO Auto-generated method stub
				CorsConfiguration corsConfiguration=new CorsConfiguration();
		
				corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000"));
				
				corsConfiguration.setAllowedMethods(Collections.singletonList("*"));
				corsConfiguration.setAllowCredentials(true);
				corsConfiguration.setAllowedHeaders(Collections.singletonList("*"));
				corsConfiguration.setExposedHeaders(Arrays.asList("Authorization"));
				corsConfiguration.setMaxAge(3600L);
				return corsConfiguration;
			}
		};
	}
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
