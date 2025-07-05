import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import LeftNav from '@/components/LeftNav';
import './App.scss';
import TopNav from './components/TopNav';
function App() {
  return (
    <div className="App">
      <div className="left">
        <LeftNav />
      </div>
      <div className="right">
        <TopNav />
        <Suspense fallback="">
          <div className="main">{useRoutes(routes)}</div>
        </Suspense>
      </div>
    </div>
  );
}

export default App;
