import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import AuthPage from "./pages/Auth";
import EventsPage from "./pages/Events";
import BookingsPage from "./pages/Bookings";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Switch>
          <Redirect from='/' to='/auth' exact />
          <Route exact path='/auth' component={AuthPage} />
          <Route exact path='/events' component={EventsPage} />
          <Route exact path='/bookings' component={BookingsPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
