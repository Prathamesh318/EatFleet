package com.infosys.admin.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Cart;
import com.infosys.admin.Model.CartItem;
import com.infosys.admin.Model.Food;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.AddCartItemRequest;
import com.infosys.admin.repository.CartItemRepo;
import com.infosys.admin.repository.CartRepo;
import com.infosys.admin.repository.FoodRepo;
import com.infosys.admin.repository.UserRepo;


@Service
public class CartServiceImp implements CartService {

	
	
	@Autowired
	private CartRepo cartRepo;
	
	@Autowired
	private CartItemRepo cartItemRepo;
	
	@Autowired
	private UserService userService;
	
	
	@Autowired
	private FoodService foodService;
	
	
	@Override
	public CartItem addItemtoCart(AddCartItemRequest req, String jwt) throws Exception {
		// TODO Auto-generated method stub
		
		User user=this.userService.findUserByJwtToken(jwt);
		
		Food food=this.foodService.findByFoodById(req.getFoodId());
		
		Cart cart=cartRepo.findByCustomerId(user.getId());
		
		for(CartItem cartItem:cart.getItem()) {
			if(cartItem.getFood().equals(food)) {
				int newQuantity=cartItem.getQuantity()+req.getQuantity();
				
				return updateCartItemQuantity(cartItem.getId(), newQuantity);
				
			}
		}
		
		CartItem newCartItem=new CartItem();
		newCartItem.setFood(food);
		newCartItem.setCart(cart);
		newCartItem.setQuantity(req.getQuantity());
		newCartItem.setIngredients(req.getIngredients());
		newCartItem.setTotalPrice(req.getQuantity()*food.getPrice());
		
		CartItem saveCartItem=this.cartItemRepo.save(newCartItem);
		
		cart.getItem().add(saveCartItem);
		
		return saveCartItem;
		
	}

	@Override
	public CartItem updateCartItemQuantity(Long cartItemid, int quantity) throws Exception {
		// TODO Auto-generated method stub
		
		CartItem cartItem=this.cartItemRepo.findById(cartItemid).get();
		
		cartItem.setQuantity(quantity);
		
		cartItem.setTotalPrice(cartItem.getFood().getPrice()*quantity);
		
		
		return this.cartItemRepo.save(cartItem);
	}

	@Override
	public Cart removeItemFromCart(Long cartItemId, String jwt) throws Exception {
		// TODO Auto-generated method stub
		User user=userService.findUserByJwtToken(jwt);
		
		Cart cart=cartRepo.findByCustomerId(user.getId());
		
		CartItem cartItem=cartItemRepo.findById(cartItemId).get();
		if(cartItem==null) {
			throw new Exception("Cart item not found");
		}
		
		cart.getItem().remove(cartItem);
		return cartRepo.save(cart);
	}

	@Override
	public Long calculateCartTotals(Cart cart) throws Exception {
		// TODO Auto-generated method stub
		Long price=(long) 0;
		for(CartItem cartItem:cart.getItem()) {
			price+=cartItem.getFood().getPrice();
		}
		return price;
	}

	@Override
	public Cart findByCartById(Long id) throws Exception {
		// TODO Auto-generated method stub
		
		
		Cart cart=this.cartRepo.findById(id).get();
		if(cart==null) {
			throw new Exception("Cart not found");
		}
		
		return cart;
	}

	@Override
	public Cart findCartByUserid(Long id) throws Exception {
		// TODO Auto-generated method stub
//		User user=this.userService.findUserByJwtToken(jwt);
		
		Cart cart=cartRepo.findByCustomerId(id);
		cart.setTotal(calculateCartTotals(cart));
		return cart;
	}

	@Override
	public Cart clearCart(Long id) throws Exception {
		// TODO Auto-generated method stub
//		User user=this.userService.findUserByJwtToken(jwt);
		Cart cart=findCartByUserid(id);
		cart.getItem().clear();
		return cartRepo.save(cart);
	}

}
