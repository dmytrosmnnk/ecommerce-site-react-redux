import React from 'react';
import { switchCurrencyLabel, switchCurrencySymbol } from '../../redux/slices/currencySlice';
import '../Navbar/Navbar.scss';
import './Currency.scss';

export class Currency extends React.Component {
  state = {
    isOpen: false,
    selectedLabel: this.props.selectedCurrencyLabel,
    selectedSymbol: this.props.selectedCurrencySymbol,
  };

  currencyRef = React.createRef();

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
    localStorage.setItem('selectedCurrencyLabel', this.state.selectedLabel);
    localStorage.setItem('selectedCurrencySymbol', this.state.selectedSymbol);
  }

  componentDidUpdate() {
    localStorage.setItem('selectedCurrencyLabel', this.state.selectedLabel);
    localStorage.setItem('selectedCurrencySymbol', this.state.selectedSymbol);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  toggle = () => {
    this.setState((state) => ({ isOpen: !state.isOpen }));
  };

  handleClick = (symbol, label) => {
    this.setState({ selectedSymbol: symbol, selectedLabel: label });
  };

  handleClickOutside = (e) => {
    if (!this.state.isOpen) {
      return;
    }

    if (!this.currencyRef.current.contains(e.target)) {
      this.toggle();
    }
  };

  render() {
    const { currencies, dispatch } = this.props;
    const { selectedSymbol, isOpen } = this.state;

    return (
      <div ref={this.currencyRef} className='CurrencySelecter'>
        <button className='CurrencySelecter__button' onClick={this.toggle}>
          {selectedSymbol || currencies[0].symbol}
          <span className='CurrencySelecter__mark'>
            {isOpen ? <>&and;</> : <>&or;</>}
          </span>
        </button>

        {isOpen && (
          <ul className='CurrencySelecter__list'>
            {currencies.map(({ label, symbol }) => (
              <li
                key={label}
                className='CurrencySelecter__item'
                onClick={() => {
                  this.handleClick(symbol, label);
                  this.toggle();
                  dispatch(switchCurrencyLabel(label));
                  dispatch(switchCurrencySymbol(symbol));
                }}
              >
                {symbol}&nbsp;{label}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}
