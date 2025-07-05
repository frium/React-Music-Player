import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import LeftNav from '@/components/LeftNav';
import './App.scss';
function App() {
  return (
    <div className="App">
      <LeftNav />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
