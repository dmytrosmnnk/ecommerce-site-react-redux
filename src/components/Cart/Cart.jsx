import React from 'react';
import './Cart.scss';
import {
  plusCount,
  minusCount,
  deleteProduct,
  clearCart,
} from '../../redux/slices/cartSlice';
import { getAmount } from '../../helpers/getValues';
import { CartInfoBlock } from '../CartInfoBlock';
import { CartItemGallery } from '../CartItemGallery';

export class Cart extends React.Component {
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
    console.log(this.state.cart);
    console.log(localStorage.cart);
    const json = JSON.stringify(this.state.cart);
    console.log(json);
    localStorage.setItem('cart', json);
    console.log(json);
  }

  plusCount = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        if (product.cartId === cartId) {
          product.count++;
        }
        return product;
      }),
    }));
  };

  minusCount = (cartId) => {
    this.setState((prevState) => ({
      cart: prevState.cart.map((product) => {
        if (product.cartId === cartId && product.count > 1) {
          product.count--;
        }
        return product;
      }),
    }));
  };

  deleteProduct = (cartId, count) => {
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
   }

  render() {
    const { cart } = this.state;
    const { amount, currencyLabel, currencySymbol, dispatch } = this.props;

    const totalPrice = cart
      .reduce((sum, item) => {
        return sum + getAmount(currencyLabel, item.prices) * item.count;
      }, 0)
      .toFixed(2);

    const tax = (totalPrice * 0.21).toFixed(2);

    return (
      <div className='Cart'>
        <h2 className='Cart__title'>Cart</h2>

        <div className='Cart__items'>
          {cart.map((product) => (
            <div key={product.cartId} className='Item'>
              <div className='Item__info InfoBlock'>
                <h2 className='InfoBlock__brand'>{product.brand}</h2>
                <h3 className='InfoBlock__name'>{product.name}</h3>
                <div className='InfoBlock__price'>
                  {currencySymbol}
                  {getAmount(currencyLabel, product.prices)}
                </div>
                <div className='InfoBlock__attributes'>
                  <CartInfoBlock attributes={product.attributes} />
                </div>
              </div>
              <div className='Item__countAndGallery'>
                <div className='Item__count'>
                  <button
                    type='button'
                    onClick={() => {
                      this.plusCount(product.cartId);
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
                      this.minusCount(product.cartId);
                      dispatch(minusCount(product.cartId));
                      this.deleteProduct(product.cartId, product.count);
                    }}
                  >
                    -
                  </button>
                </div>

                <CartItemGallery
                  gallery={product.gallery}
                  name={product.name}
                />
              </div>
            </div>
          ))}
        </div>

        <div className='Cart__info'>
          <p className='Cart__tax'>
            Tax 21%:&nbsp;
            <span className='Cart__infoBold'>
              {currencySymbol}
              {tax}
            </span>
          </p>
          <p className='Cart__quantity'>
            Quantity:&nbsp;
            <span className='Cart__infoBold'>{amount}</span>
          </p>
          <p className='Cart__total'>
            Total:&nbsp;
            <span className='Cart__infoBold'>
              {currencySymbol}
              {totalPrice}
            </span>
          </p>
        </div>
        <button
          type='button'
          className='Cart__button'
          onClick={() => {
            this.onOrderButton();
            this.clearCart();
          }}
        >
          <p>Order</p>
        </button>
        <button
          type='button'
          className='ClearButton'
          onClick={() => this.clearCart()}
        >
          <p>Clear cart</p>
        </button>
      </div>
    );
  }
}
