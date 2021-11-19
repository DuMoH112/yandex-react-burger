import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { HomePage } from '../../pages';

import styles from './app.module.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact={true} element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
};
