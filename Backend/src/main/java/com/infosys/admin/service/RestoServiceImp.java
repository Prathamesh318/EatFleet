package com.infosys.admin.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Address;
import com.infosys.admin.Model.Restaurant;
import com.infosys.admin.Model.RestaurantDto;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.CreateRestaurantRequest;
import com.infosys.admin.repository.AddressRepo;
import com.infosys.admin.repository.RestoRepo;
import com.infosys.admin.repository.UserRepo;


@Service
public class RestoServiceImp implements RestaurantService{
	
	
	@Autowired
	private RestoRepo restorepo;
	
	@Autowired
	private AddressRepo addressRepo;
	
	
	@Autowired
	private UserRepo userRepo;

	@Override
	public Restaurant createRestaurant(CreateRestaurantRequest req, User user) {
		// TODO Auto-generated method stub
		
		Address address=addressRepo.save(req.getAddress());
		Restaurant restaurant=new Restaurant();
		
		restaurant.setAddress(address);
		restaurant.setCuisineType(req.getCuisuineType());
		restaurant.setContactInformation(req.getContactInformation());
		restaurant.setDescription(req.getDescription());
		restaurant.setName(req.getName());
		restaurant.setImages(req.getImages());
		restaurant.setOpeninghours(req.getOpeningHours());
		restaurant.setRegistrationDate(LocalDateTime.now());
		restaurant.setOwner(user);
		
		
		return restorepo.save(restaurant);
	}

	@Override
	public Restaurant updateRestaurant(Long restaurantid, CreateRestaurantRequest updatedRestaurant) throws Exception {
		// TODO Auto-generated method stub
		
		Restaurant restaurant=findRestaurantById(restaurantid);
		if(restaurant.getCuisineType()!=null) {
			restaurant.setCuisineType(updatedRestaurant.getCuisuineType());
		}
		if(restaurant.getDescription()!=null) {
			restaurant.setDescription(updatedRestaurant.getDescription());
		}
		if(restaurant.getName()!=null) {
			restaurant.setName(updatedRestaurant.getName());
		}
		return restorepo.save(restaurant);
	}

	@Override
	public void deleteRestaurant(Long restaurantId) throws Exception {
		// TODO Auto-generated method stub
		Restaurant restaurant=findRestaurantById(restaurantId);
		restorepo.delete(restaurant);	
	}

	@Override
	public List<Restaurant> getAllRestaurant() {
		// TODO Auto-generated method stub
		return restorepo.findAll();
	}

	@Override
	public List<Restaurant> searchRestaurant(String keywords) {
		// TODO Auto-generated method stub
		return restorepo.findBySearchQuery(keywords);
		
	}

	@Override
	public Restaurant findRestaurantById(Long restaurantid) throws Exception {
		// TODO Auto-generated method stub
		Restaurant restaurant=this.restorepo.findById(restaurantid).get();
		
		if(restaurant==null) {
			throw new Exception("Restaurant not found with id:"+restaurantid);
		}
		return restaurant;
	}

	@Override
	public Restaurant getRestaurantByUserId(Long userId) throws Exception {
		// TODO Auto-generated method stub
		
		Restaurant restaurant= this.restorepo.findByOwnerId(userId);
		
		
		if(restaurant==null) {
			throw new Exception("Restaurant not found");
		}
		return restaurant;
		
		
	}

	@Override
	public RestaurantDto addToFavorites(Long restaurantId, User user) throws Exception {
		// TODO Auto-generated method stub
		
		Restaurant restaurant=findRestaurantById(restaurantId);
		
		RestaurantDto dto=new RestaurantDto();
		dto.setDescription(restaurant.getDescription());
		dto.setImages(restaurant.getImages());
		dto.setTitle(restaurant.getName());
		dto.setId(restaurantId);
		
		
		
		boolean isFavorited = false;
		List<RestaurantDto> favorites = user.getFavourites();
		for(RestaurantDto favorite:favorites) {
			if(favorite.getId().equals(restaurantId)) {
				isFavorited = true;
				break;
			}
		}
		if(isFavorited) {
			favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
		}
		else {
			favorites.add(dto);
		}
		
		userRepo.save(user);
		
		return dto;
	}

	@Override
	public Restaurant updaterestaurantStatus(Long restaurantId) throws Exception {
		// TODO Auto-generated method stub
		
		Restaurant restaurant=findRestaurantById(restaurantId);
		
		restaurant.setOpen(!restaurant.isOpen());
		return restorepo.save(restaurant);
	}

	

}
