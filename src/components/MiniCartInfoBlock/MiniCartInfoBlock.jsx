import React from 'react';
import classNames from 'classnames';
import './MiniCartInfoBlock.scss';

export class MiniCartInfoBlock extends React.Component {
  render() {
    const { attributes } = this.props;

    return (
      <>
        {attributes.map((attribute) => (
          <div key={attribute.id} className='Property'>
            <p className='Property__name'>{attribute.name}:</p>
            <div className='Property__items'>
              {attribute.items.map((item) =>
                attribute.type === 'swatch' ? (
                  <div
                    key={item.id}
                    className={classNames('Property__itemValue', 'swatch', {
                      activeSwatch: item.isActive === true,
                    })}
                    style={{
                      backgroundColor: item.value,
                    }}
                  />
                ) : (
                  <div
                    key={item.id}
                    className={classNames('Property__itemValue', {
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
