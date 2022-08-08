import React from 'react';
import classNames from 'classnames';
import './ProductAttribute.scss';

export class ProductAttribute extends React.Component {
  render() {
    const { attributes, selectItem } = this.props;

    return (
      <>
        {attributes.map((attribute) => (
          <div key={attribute.id} className='Attribute'>
            <p className='Attribute__name'>{attribute.name}:</p>
            <div className='Attribute__items'>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <div
                    key={item.id}
                    className={classNames('Attribute__itemValue', 'swatch', {
                      activeSwatch: item.isActive === true,
                    })}
                    onClick={() => selectItem(attribute.id, item.id)}
                    style={{
                      backgroundColor: item.value,
                    }}
                  />
                ) : (
                  <div
                    key={item.id}
                    className={classNames('Attribute__itemValue', {
                      activeItem: item.isActive === true,
                    })}
                    onClick={() => selectItem(attribute.id, item.id)}
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
