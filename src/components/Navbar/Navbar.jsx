import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';
import logo from '../../photo/logo-main.png';
import cartLogo from '../../photo/cart-right-200.png';
import { NavbarCategoriesQuery } from './NavbarCategories';
import { CurrencyQuery } from '../Currency';
import { NavbarCartCounterWrapper } from '../NavbarCartCounter';
import { MiniCartWrapper } from '../MiniCart/MiniCartWrapper';

export class Navbar extends React.Component {
  state = {
    isMiniCartOpen: false,
  };

  cartRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutsideCart);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutsideCart);
  }

  toggle = () => {
    this.setState((state) => ({ isMiniCartOpen: !state.isMiniCartOpen }));
  };

  handleClickOutsideCart = (e) => {
    if (!this.state.isMiniCartOpen) {
      return;
    }

    if (!this.cartRef.current.contains(e.target)) {
      this.toggle();
    }
  };

  render() {
    const { isMiniCartOpen } = this.state;

    return (
      <nav className='Navbar'>
        <div className='Navbar__categories'>
          <NavbarCategoriesQuery />
        </div>

        <div className='Navbar__logo'>
          <Link to='/all'>
            <img src={logo} alt='Site main logo' />
          </Link>
        </div>

        <div className='Navbar__currencyandcart'>
          <div className='Navbar__currency'>
            <CurrencyQuery />
          </div>

          <div ref={this.cartRef} className='Navbar__cart'>
            <div
              className='Navbar__cartImage'
              style={{ backgroundImage: `url(${cartLogo})` }}
              onClick={this.toggle}
            />

            <NavbarCartCounterWrapper toggle={this.toggle} />

            {isMiniCartOpen && (
              <>
                <MiniCartWrapper toggle={this.toggle} />
              </>
            )}
          </div>
          {isMiniCartOpen && <div className='Background'></div>}
        </div>
      </nav>
    );
  }
};
