import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.scss';
import { Layout } from './components/Layout/Layout';
import { CatalogAllQuery } from './components/Catalog/CatalogAllQuery';
import { ClothesQuery } from './components/Catalog/ClothesQuery';
import { TechQuery } from './components/Catalog/TechQuery';
import { NotFound } from './components/Catalog/NotFound';
import { CartWrapper } from './components/Cart';
import { ProductPageWrapper } from './components/ProductPage';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route path='all' element={<CatalogAllQuery />} />
            <Route path='all/:id' element={<ProductPageWrapper />} />
            <Route path='clothes' element={<ClothesQuery />} />
            <Route path='clothes/:id' element={<ProductPageWrapper />} />
            <Route path='tech' element={<TechQuery />} />
            <Route path='tech/:id' element={<ProductPageWrapper />} />
            <Route path='cart' element={<CartWrapper />} />
            <Route path='/' element={<Navigate replace to='/all' />} />
            <Route path='/home' element={<Navigate replace to='/all' />} />
            <Route
              path='ecommerce-site-react-redux'
              element={<Navigate replace to='/all' />}
            />
            <Route path='*' element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    );
  }
}

export default App;
