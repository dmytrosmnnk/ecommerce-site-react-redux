import React from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import '../Catalog/Catalog.scss';
import { getAmount } from '../../helpers/getValues';
import cartLogo from '../../photo/cart-right-wt200.png';

export class ProductCard extends React.Component {
  state = {
    isHover: false,
    listProduct: JSON.parse(JSON.stringify(this.props.product)),
  };

  componentDidMount() {
    const defaultProduct = JSON.parse(JSON.stringify(this.state.listProduct));

    defaultProduct.attributes.map(
      (attribute) => (attribute.items[0]['isActive'] = true)
    );

    this.setState({ listProduct: defaultProduct });
  }

  render() {
    const { product, currencyLabel, currencySymbol, onAddToCart } = this.props;
    const { isHover, listProduct } = this.state;
    const { inStock, gallery, name, prices } = product;

    return (
      <div
        onMouseEnter={() => this.setState({ isHover: true })}
        onMouseLeave={() => this.setState({ isHover: false })}
      >
        <Link to={`${product.id}`} style={{ textDecoration: 'none' }}>
          <div>
            <div
              className={classNames('Catalog__itemPhoto', {
                outofStock: !inStock,
              })}
              style={{ backgroundImage: `url(${gallery[0]})` }}
            />

            <p
              className={classNames('Catalog__itemName', {
                outofStock: !inStock,
              })}
            >
              {name}
            </p>
            <p
              className={classNames('Catalog__itemPrice', {
                outofStock: !inStock,
              })}
            >
              {currencySymbol}
              {getAmount(currencyLabel, prices)}
            </p>
          </div>
        </Link>

        {inStock && isHover && (
          <button
            className='Catalog__addButton'
            style={{ backgroundImage: `url(${cartLogo})` }}
            type='button'
            onClick={() => onAddToCart(listProduct)}
          ></button>
        )}
      </div>
    );
  }
}
