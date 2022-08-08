import React from 'react';
import '../Cart/Cart.scss';

export class CartItemGallery extends React.Component {
  state = {
    photoIndex: 0,
  };

  nextImage = () => {
    this.setState((prevState) => ({
      photoIndex: this.props.gallery[prevState.photoIndex + 1]
        ? prevState.photoIndex + 1
        : prevState.photoIndex,
    }));
  };

  prevImage = () => {
    this.setState((prevState) => ({
      photoIndex: this.props.gallery[prevState.photoIndex - 1]
        ? prevState.photoIndex - 1
        : prevState.photoIndex,
    }));
  };

  render() {
    const { photoIndex } = this.state;
    const {gallery, name} = this.props;

    return (
      <div
        className='Item__gallery'
        /* style={{ background: `url(${gallery[photoIndex]})`, backgroundSize: 'contain', backgroundPosition: 'center' }} */
      >
        <img src={gallery[photoIndex]} alt={name} />
        <div className='Item__galleryButtons'>
          <button type='button' onClick={() => this.prevImage()}>
            <span>&lt;</span>
          </button>
          <button type='button' onClick={() => this.nextImage()}>
            <span>&gt;</span>
          </button>
        </div>
      </div>
    );
  }
}
