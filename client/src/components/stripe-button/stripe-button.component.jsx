import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_HS0jHHZbExVCpfVHeGM8yjgm004eKCRVhQ";

  const onToken = async (token) => {
    try {
      await axios.post("/payment", { amount: priceForStripe, token });
      alert("Payment Succesful!");
    } catch (e) {
      console.log("Payment error", JSON.parse(e));
      alert("Some error occured! Please use the given credit card to test");
    } finally {
    }
    alert("Payment Succesful!");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="Classy Clothing Ltd."
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
