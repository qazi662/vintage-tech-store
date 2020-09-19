import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import CartLink from "./Cart/CartLink";
import LoginLink from "./LoginLink";
import { UserContext } from "../context/user";

export default function Header() {
  const { user } = React.useContext(UserContext);
  return (
    <header className="header">
      <img src={logo} alt="vintage tech logo" className="logo" />
      <nav>
        <ul>
          <div>
            <li>
              <Link to="/" className="">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="">
                About
              </Link>
            </li>
            <li>
              <Link to="/products" className="">
                Products
              </Link>
            </li>
            {user.token && (
              <li>
                <Link to="/checkout">checkout</Link>
              </li>
            )}
          </div>
          <div>
            <LoginLink />
            <CartLink />
          </div>
        </ul>
      </nav>
    </header>
  );
}
