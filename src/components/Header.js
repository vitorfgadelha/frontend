import React, { Component } from "react";
import Logo from '../images/digitime.png';

class Header extends Component {
  render() {
    return (
      <div className="text-center">
        <img
          src={Logo}
          width="200"
          style={{ marginTop: "20px" }}
          alt="Logo"
        />
        <h2>Kits Delivery Service</h2>
      </div>
    );
  }
}

export default Header;