package com.infosys.admin.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.infosys.admin.Model.Cart;
import com.infosys.admin.Model.CartItem;
import com.infosys.admin.Model.User;
import com.infosys.admin.Request.AddCartItemRequest;
import com.infosys.admin.Request.UpdateCartItemRequest;
import com.infosys.admin.service.CartService;
import com.infosys.admin.service.UserService;

@RestController
@RequestMapping("/api")
public class CartController {
	
	@Autowired
	CartService cartService;
	
	@Autowired
	UserService userService;
	
	
	@PutMapping("/cart/add")
	public ResponseEntity<CartItem>addtocart(@RequestBody AddCartItemRequest req,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		
		CartItem cartItem=cartService.addItemtoCart(req, jwt);
		
		return new ResponseEntity<CartItem>(cartItem,HttpStatus.CREATED);
		
	}
	
	@PutMapping("/cart-item/update")
	public ResponseEntity<CartItem>updateCartItemQuantity(@RequestBody UpdateCartItemRequest req,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		
		System.out.println("Cart is"+req.getId());
		CartItem cartItem=cartService.updateCartItemQuantity(req.getId(), req.getQuantity());
		
		return new ResponseEntity<CartItem>(cartItem,HttpStatus.CREATED);
		
	}
	@DeleteMapping("/cart-item/{id}/remove")
	public ResponseEntity<Cart>removeCartItem(@PathVariable Long id,
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		
		Cart cart=cartService.removeItemFromCart(id, jwt);
		
		return new ResponseEntity<Cart>(cart,HttpStatus.CREATED);
		
	}
	@DeleteMapping("/cart/clear")
	public ResponseEntity<Cart>clearCart(
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		Cart cart=cartService.clearCart(user.getId());
		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
		
	}
	
	@GetMapping("/cart")
	public ResponseEntity<Cart>findUserCart(
			@RequestHeader("Authorization")String jwt
			)throws Exception{
		
		User user=userService.findUserByJwtToken(jwt);
		Cart cart=cartService.findCartByUserid(user.getId());
		
		return new ResponseEntity<Cart>(cart,HttpStatus.OK);
		
	}

}
