import React from 'react';
import classNames from 'classnames';
import './CartInfoBlock.scss';

export class CartInfoBlock extends React.Component {
  render() {
    const { attributes } = this.props;

    return (
      <>
        {attributes.map((attribute) => (
          <div key={attribute.id} className='CartAttribute'>
            <p className='CartAttribute__name'>{attribute.name}:</p>
            <div className='CartAttribute__items'>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <div
                    key={item.id}
                    className={classNames(
                      'CartAttribute__itemValue',
                      'swatch',
                      {
                        activeSwatch: item.isActive === true,
                      }
                    )}
                    style={{
                      backgroundColor: item.value,
                    }}
                  />
                ) : (
                  <div
                    key={item.id}
                    className={classNames('CartAttribute__itemValue', {
                      activeItem: item.isActive === true,
                    })}
                  >
                    <p>{item.value}</p>
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </>
    );
  }
}
