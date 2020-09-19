import React from "react";
import { CartContext } from "../context/cart";
import { UserContext } from "../context/user";
import { useHistory } from "react-router-dom";
import EmptyCart from "../components/Cart/EmptyCart";
import submitOrder from "../strapi/submitOrder";
import {
  CardElement,
  StripeProvider,
  Elements,
  injectStripe,
} from "react-stripe-elements";

function Checkout(props) {
  const { cart, total, clearCart } = React.useContext(CartContext);
  const { user, showAlert, hideAlert, alert } = React.useContext(UserContext);
  const history = useHistory();

  const [name, setName] = React.useState("");
  const [error, setError] = React.useState("");
  const isEmpty = !name || alert.show;
  async function handleSubmit(e) {
    showAlert({ msg: "submitting order... please wait" });
    e.preventDefault();
    const response = await props.stripe
      .createToken()
      .catch((error) => console.log(error));

    const { token } = response;
    if (token) {
      setError("");
      const { id } = token;
      let order = await submitOrder({
        name,
        total,
        items: cart,
        stripeTokenId: id,
        userToken: user.token,
      });
      if (order) {
        showAlert({ msg: "your order os completed" });
        clearCart();
        history.push("/");
        return;
      } else {
        showAlert({
          msg: "there was an error with your order. please try again!",
          type: "danger",
        });
      }
    } else {
      hideAlert();
      setError(response.error.message);
    }
  }
  if (cart.length < 1) return <EmptyCart />;

  return (
    <section className="section form">
      <h2 className="section-title">Checkout</h2>
      <form className="checkout-form">
        <h3>
          order total : <span>${total}</span>
        </h3>
        <div className="form-control">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="stripe-input">
          <label htmlFor="card-element">credit or debit card</label>
          <p className="stripe-info">
            test using this credit card : <span>4242 4242 4242 4242</span>{" "}
            <br />
            enter any 5 digits for the zip code
            <br />
            enter any 3 digits for the CVC
          </p>
        </div>
        <CardElement className="card-element"></CardElement>
        {error && <p className="form-empty">{error}</p>}
        {isEmpty ? (
          <p className="form-empty">please fill all name field</p>
        ) : (
          <button
            type="submit"
            onClick={handleSubmit}
            className="btn btn-primary btn-block"
          >
            submit
          </button>
        )}
      </form>
    </section>
  );
}

const CardForm = injectStripe(Checkout);

const StripeWrapper = () => {
  return (
    <StripeProvider apiKey="pk_test_51HT6hZAq6xeI8ROjnuOaRZg1DlOyfN780ZM4KPJyXXMMa5trmA8CCIoxHsDrIcZs773Tl0L7p7jf4R3lo2zHU2qC00WnhT5KxY">
      <Elements>
        <CardForm></CardForm>
      </Elements>
    </StripeProvider>
  );
};

export default StripeWrapper;
