package com.infosys.admin.service;

import com.infosys.admin.Model.Cart;
import com.infosys.admin.Model.CartItem;
import com.infosys.admin.Request.AddCartItemRequest;

public interface CartService {
	public CartItem addItemtoCart(AddCartItemRequest req,String jwt) throws Exception;
	
	public CartItem updateCartItemQuantity(Long cartItemid,int quantity)throws Exception;
	
	public Cart removeItemFromCart(Long cartItemId,String jwt)throws Exception;
	
	public Long calculateCartTotals(Cart cart)throws Exception;
	
	public Cart findByCartById(Long id)throws Exception;
	
	public Cart findCartByUserid(Long id)throws Exception;
	
	public Cart clearCart(Long id)throws Exception;
	
	

}
