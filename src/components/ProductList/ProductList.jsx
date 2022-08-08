import React from 'react';
import { replaceSelectedProduct } from '../../redux/slices/selectedPageSlice';
import { addProduct } from '../../redux/slices/cartSlice';
import { getId } from '../../helpers/getId';
import '../Catalog/Catalog.scss';
import { ProductCardWrapper } from '../ProductCard';

export class ProductList extends React.Component {
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

  onAddToCart = (product) => {
    const item = {
      ...product,
      count: 1,
      cartId: getId(),
    };

    this.setState({
      cart: [...this.state.cart, item],
    });

    this.props.dispatch(addProduct(JSON.parse(JSON.stringify(item))));
  };

  render() {
    const { catalog, dispatch } = this.props;

    return (
      <>
        <ul className='Catalog__list'>
          {catalog.map((product) => (
            <li
              key={product.id}
              className='Catalog__item'
              onClick={() => dispatch(replaceSelectedProduct(product))}
            >
              <ProductCardWrapper
                product={product}
                onAddToCart={this.onAddToCart}
              />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
