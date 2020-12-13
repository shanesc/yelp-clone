import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Home from './routes/Home';
import DetailPage from './routes/DetailPage';
import UpdatePage from './routes/UpdatePage';
import { RestaurantsContextProvider } from './context/RestaurantsContext';
import UserRegister from './routes/UserRegister';

function App() {
  return (
    <RestaurantsContextProvider>
      <div className="container">
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/restaurants/:id">
              <DetailPage />
            </Route>
            <Route exact path="/restaurants/:id/update">
              <UpdatePage />
            </Route>
            <Route exact path="/users/register">
              <UserRegister />
            </Route>
          </Switch>
        </Router>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
