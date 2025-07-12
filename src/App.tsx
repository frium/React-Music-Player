import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
import LeftNav from '@/components/LeftNav';
import './App.scss';
import TopNav from './components/TopNav';
import BottomPlayer from './components/BottomPlayer';
function App() {
  return (
    <div className="App">
      <div className="app-top">
        <div className="app-left">
          <LeftNav />
        </div>
        <div className="app-right">
          <TopNav />
          <Suspense fallback="">
            <div className="main">{useRoutes(routes)}</div>
          </Suspense>
        </div>
      </div>
      <div className="app-bottom">
        <BottomPlayer />
      </div>
    </div>
  );
}

export default App;
