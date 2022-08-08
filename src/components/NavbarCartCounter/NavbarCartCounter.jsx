import React from 'react';

export class NavbarCartCounter extends React.Component {
  state = { amount: this.props.amount };

  componentDidUpdate(prevProps) {
    if (prevProps.amount !== this.props.amount) {
      this.setState({ amount: this.props.amount });
    }
  }

  render() {
    const { amount } = this.state;
    const { toggle } = this.props;

    if (amount > 0) {
      return (
        <div className='Navbar__cartCounter' onClick={toggle}>
          <p>{amount}</p>
        </div>
      );
    }
  }
};
