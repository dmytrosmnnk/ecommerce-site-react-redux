import React from 'react';
import './Catalog.scss';
import { ProductListWrapper } from '../ProductList';

export class Tech extends React.Component {
  render() {
    const { catalog, categoryName } = this.props;

    return (
      <div className='Catalog'>
        <h2 className='Catalog__title'>{categoryName}</h2>
        <ProductListWrapper catalog={catalog} />
      </div>
    );
  }
}
