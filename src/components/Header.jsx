import React from 'react';
import {
  NavbarBrand
} from 'reactstrap';

const Header = () => {
  return (
    <header>
      <NavbarBrand href='/' className="text-uppercase header-text"> Employee Directory</NavbarBrand>
    </header>
  );
};

export default Header;