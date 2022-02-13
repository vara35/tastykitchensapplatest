import {Switch, Route, Redirect} from 'react-router-dom'

import LoginRoute from './components/LoginRoute'
import Home from './components/Home'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import Profile from './components/Profile'
import OpenRestaurant from './components/OpenRestaurant'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute
        exact
        path="/restaurant/:id"
        component={SpecificRestaurant}
      />
      <ProtectedRoute exact path="/cart" component={Cart} />
      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute
        exact
        path="/open-restaurant"
        component={OpenRestaurant}
      />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
