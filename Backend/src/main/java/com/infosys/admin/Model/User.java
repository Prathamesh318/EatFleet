package com.infosys.admin.Model;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

@Table(name="user_table")
public class User {
	
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	private String fullName;
	private String email;
	
	@JsonProperty(access=Access.WRITE_ONLY)
	private String password;
	
	private USER_ROLE role=USER_ROLE.ROLE_CUSTOMER;
	@OneToMany(cascade = CascadeType.ALL, mappedBy = "customer")
	@JsonIgnore
	private List<Order> orders=new ArrayList<>();
	
	@ElementCollection
	private List<RestaurantDto>favourites;
	
	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Address> addresses=new ArrayList<>();
}
