import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import HomePage from './pages/HomePage/HomePage';
import DemoPage from './pages/DemoPage/DemoPage';

function App (): React.ReactElement {
  return (
      <div className={'App'}>
        <Router>
          <NavBar/>
          <Routes>
            <Route path={'/'} element={<HomePage/>}/>
            <Route path={'/demo'} element={<DemoPage/>}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;