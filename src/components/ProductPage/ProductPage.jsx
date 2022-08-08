import React from 'react';
import parse from 'html-react-parser';
import { addProduct } from '../../redux/slices/cartSlice';
import { getAmount } from '../../helpers/getValues';
import './ProductPage.scss';
import { ProductAttribute } from '../ProductAttribute/ProductAttribute';
import { getId } from '../../helpers/getId';

export class ProductPage extends React.Component {
  state = {
    selectedPhoto: '',
    selectedProduct: JSON.parse(JSON.stringify(this.props.product)),
    cart: JSON.parse(JSON.stringify(this.props.cart)),
  };

  componentDidMount() {
    const defaultProduct = JSON.parse(
      JSON.stringify(this.state.selectedProduct)
    );

    defaultProduct.attributes.map((attribute) =>
      attribute.items[0]['isActive'] === false
        ? null
        : (attribute.items[0]['isActive'] = true)
    );

    this.setState({ selectedProduct: defaultProduct });

    const json = JSON.stringify(this.state.selectedProduct);
    localStorage.setItem('selectedProduct', json);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.selectedProduct !== this.state.selectedProduct) {
      const json = JSON.stringify(this.state.selectedProduct);
      localStorage.setItem('selectedProduct', json);
    }
    
    if (prevState.cart !== this.state.cart) {
      const json2 = JSON.stringify(this.state.cart);
      localStorage.setItem('cart', json2);
    }
  }

  selectPhoto = (url) => {
    this.setState({ selectedPhoto: url });
  };

  selectItem = (attributeId, itemId) => {
    const productCopy = JSON.parse(JSON.stringify(this.state.selectedProduct));

    const items = productCopy.attributes.find(
      (attribute) => attribute.id === attributeId
    ).items;
    items.map((item) => (item['isActive'] = false));

    const activeItem = items.find((item) => item.id === itemId);
    activeItem['isActive'] = true;

    this.setState({ selectedProduct: productCopy });
  };

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
    const { selectedPhoto, selectedProduct } = this.state;
    const { currencyLabel, currencySymbol } = this.props;

    const { attributes, brand, description, gallery, inStock, name, prices } =
      selectedProduct;

    return (
      <section className='Product'>
        <div className='Product__gallery'>
          {gallery.map((image) => (
            <div
              key={image}
              className='Product__galleryItem'
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => this.selectPhoto(image)}
            />
          ))}
        </div>

        <div className='Product__photo'>
          <img src={selectedPhoto || gallery[0]} alt={name} />
        </div>

        <div className='Product__info InfoBlock'>
          <h2 className='InfoBlock__brand'>{brand}</h2>
          <h3 className='InfoBlock__name'>{name}</h3>

          <div className='InfoBlock__attributes'>
            <ProductAttribute
              attributes={attributes}
              selectItem={this.selectItem}
            />
          </div>

          <div className='InfoBlock__price'>
            <p>price:</p>
            <p className='InfoBlock__pricePrice'>
              {currencySymbol}
              {getAmount(currencyLabel, prices)}
            </p>
          </div>

          {inStock ? (
            <button
              type='button'
              className='InfoBlock__button'
              onClick={() => this.onAddToCart(selectedProduct)}
            >
              <p>add to cart</p>
            </button>
          ) : (
            <div className='InfoBlock__outOfStock'>
              <p>out of stock</p>
            </div>
          )}

          <div className='InfoBlock__description'>{parse(description)}</div>
        </div>
      </section>
    );
  }
};
