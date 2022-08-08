import React from 'react';
import './Catalog.scss';

export class NotFound extends React.Component {
  render() {
    return (
      <div className='Catalog'>
        <h2 className='Catalog__title'>
          Page not found! - 404 :(
        </h2>
      </div>
    );
  }
}
