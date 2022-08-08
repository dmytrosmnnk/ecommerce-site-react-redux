import React from 'react';
import { Link } from 'react-router-dom';
import './MiniCart.scss';
import {
  plusCount,
  minusCount,
  deleteProduct,
  clearCart,
} from '../../redux/slices/cartSlice';
import { getAmount } from '../../helpers/getValues';
import { MiniCartInfoBlock } from '../MiniCartInfoBlock';

export class MiniCart extends React.Component {
  state = {
    cart: JSON.parse(JSON.stringify(this.props.cart)),
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        cart: JSON.parse(JSON.stringify(nextProps.cart)),
      });
    }
  }

  componentDidUpdate() {
    const json = JSON.stringify(this.state.cart);
    localStorage.setItem('cart', json);
  }

  plusItem = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        if (product.cartId === cartId) {
          product.count++;
        }
        return product;
      }),
    }));
  };

  minusItem = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        if (product.cartId === cartId && product.count > 1) {
          product.count--;
        }
        return product;
      }),
    }));
  };

  deleteItem = (cartId, count) => {
    if (count === 1) {
      this.setState((prevState) => ({
        cart: prevState.cart.filter((product) => product.cartId !== cartId),
      }));

      this.props.dispatch(deleteProduct(cartId));
    }
  };

  clearCart = () => {
    this.setState({
      cart: [],
    });
    this.props.dispatch(clearCart());
  };

  onOrderButton = () => {
    alert('Your order has been sent for processing. Thank you!');
  };

  render() {
    const { amount, currencyLabel, currencySymbol, toggle, dispatch } =
      this.props;

    const { cart } = this.state;

    const totalPrice = cart
      .reduce((sum, item) => {
        return sum + getAmount(currencyLabel, item.prices) * item.count;
      }, 0)
      .toFixed(2);

    return (
      <div className='MiniCart'>
        <h2 className='MiniCart__title'>
          my bag,&nbsp;
          <span className='MiniCart__subtitle'>{amount} item(-s)</span>
        </h2>

        <div className='MiniCart__items'>
          {cart.map((product) => (
            <div key={product.cartId} className='Unit'>
              <div className='Unit__info Infobar'>
                <h2 className='Infobar__brand'>{product.brand}</h2>
                <h3 className='Infobar__name'>{product.name}</h3>
                <div className='Infobar__price'>
                  {currencySymbol}
                  {getAmount(currencyLabel, product.prices)}
                </div>
                <div className='Infobar__attributes'>
                  <MiniCartInfoBlock attributes={product.attributes} />
                </div>
              </div>
              <div className='Unit__countAndGallery'>
                <div className='Unit__count'>
                  <button
                    type='button'
                    onClick={() => {
                      this.plusItem(product.cartId);
                      dispatch(plusCount(product.cartId));
                    }}
                  >
                    +
                  </button>
                  <div>
                    <p>{product.count}</p>
                  </div>
                  <button
                    type='button'
                    onClick={() => {
                      this.minusItem(product.cartId);
                      dispatch(minusCount(product.cartId));
                      this.deleteItem(product.cartId, product.count);
                    }}
                  >
                    -
                  </button>
                </div>
                <div className='Unit__gallery'>
                  <img src={product.gallery[0]} alt={product.name} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='MiniCart__info'>
          <p className='MiniCart__infoTotal'>Total:</p>
          <p className='MiniCart__infoSum'>
            {currencySymbol}
            {totalPrice}
          </p>
        </div>

        <div className='MiniCart__buttons'>
          <Link to='/cart'>
            <button
              type='button'
              className='MiniCart__button View-button'
              onClick={() => toggle()}
            >
              <p>view bag</p>
            </button>
          </Link>

          <button
            type='button'
            className='MiniCart__button Check-button'
            onClick={() => {
              this.onOrderButton();
              this.clearCart();
            }}
          >
            <p>check out</p>
          </button>
        </div>
      </div>
    );
  }
}
