import React from 'react';
import { NavLink } from 'react-router-dom';
import '../Navbar.scss';

export class NavbarCategories extends React.Component {
  render() {
    const { categories } = this.props;

    return (
      <>
        {categories.map(({ name }) => (
          <NavLink key={name} to={`/${name}`} className='Navbar__category'>
            {name}
          </NavLink>
        ))}
      </>
    );
  }
}
