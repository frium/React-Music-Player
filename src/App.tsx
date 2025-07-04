import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import routes from './router';
function App() {
  return (
    <div className="App">
      <div className="nav">导航栏</div>
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  );
}

export default App;
