package com.infosys.admin.service;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.infosys.admin.Model.Order;
import com.infosys.admin.response.PaymentResponse;

@Service
public class PaymentResponseImpl implements PaymentService {

    @Value("${stripe.api.key}")
    private String apiKey;

    @Override
    public PaymentResponse createPaymentLink(Order order) {
        // Set Stripe API key
        Stripe.apiKey = apiKey;

        try {
            // Ensure order total is greater than zero
            long amount = (long) (order.getTotalPrice() * 100); // Convert to cents
            if (amount <= 0) {
                amount = 100; // Set default to 1 USD (100 cents) for testing purposes
            }

            // Build the session params for Stripe Checkout
            SessionCreateParams params = SessionCreateParams.builder()
                // Add multiple payment methods like card and UPI
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD) // Card payment method
//                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.UPI)  // UPI payment method
                .setMode(SessionCreateParams.Mode.PAYMENT) // Set the mode to "payment"
                .setSuccessUrl("http://localhost:3000/payment/success/" + order.getId()) // Success URL
                .setCancelUrl("http://localhost:3000/payment/fail") // Cancel URL
                .addLineItem(
                    SessionCreateParams.LineItem.builder()
                        .setQuantity(1L) // Quantity of the product
                        .setPriceData(
                            SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("usd") // Set the currency for India
                                .setUnitAmount(amount) // Amount in cents (must be > 0)
                                .setProductData(
                                    SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                        .setName("EatFleet") // Product name
                                        .build()
                                )
                                .build()
                        )
                        .build()
                )
                .build();

            // Create the session
            Session session = Session.create(params);

            // Prepare and return the payment response with the session URL
            PaymentResponse response = new PaymentResponse();
            response.setPayment_url(session.getUrl());
            System.out.println("Payment session created successfully with UPI and card methods.");
            return response;

        } catch (StripeException e) {
            // Log the exception properly for debugging
            e.printStackTrace();
            System.out.println("Error occurred while creating payment session: " + e.getMessage());
            return null;
        }
    }
}
