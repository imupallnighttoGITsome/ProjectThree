
import './App.css';
import { Route, Link } from 'react-router-dom';
import { useState, useEffect } from 'react'
import axios from "axios";
import Login from './components/userinfo/UserLogin';
import SignUp from './components/userinfo/UserSignup';
//import Home from './components/userinfo/Home';
import Profile from './components/userinfo/UserProfile';
import AuthService from "./components/userinfo/services/auth.service";
import ResourcePage from './components/ResourcePage';


// general components
import EventForm from "./components/events-group/event-forms/EventForm";
import EventUpdateForm from "./components/events-group/event-forms/EventUpdateForm";
import EventView from "./components/events-group/event-view-update-delete/event-view";
import CityDirectory from "./components/events-group/events-directory/city-directory";
import CityHomePage from "./components/events-group/eventsHomePage/city-homepage";
// auth



function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [eventView, setEventView] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
  <div className="App">
    {currentUser ? (
    <div>
      <li><Link to={"/profile"}>{currentUser.username}</Link></li>
      <li><a href="/login" onClick={logOut}>LogOut</a></li>
    </div>
    ) : (
    <div>
      <li><Link to={"/login"}>Login</Link></li>
      <li><Link to={"/register"}>Sign Up</Link></li>
    </div>
          )}
    <main>
            {/* <Route exact path="/" component={Home} /> */}
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={SignUp} />
      <Route exact path="/profile" component={Profile}/>
      <Route exact path="/resources" component={ResourcePage} />
      <Route exact path="/events" component={CityDirectory} />
      <Route exact path="/event/:id"
          render={(routerProps) => (
            <EventView currentUser={userData} match={routerProps.match}/>
          )}/>
      <Route exact path="/eventadd" render={routerProps => <EventForm currentUser={userData} match={routerProps.match}/>} />
        <Route exact path="/event/edit/:id"
          render={(routerProps) => (
            <EventUpdateForm
              // setEventView={setEventView}
              // match={routerProps.match}
              // eventView={eventView}
            />
          )}
        />
      <Route exact path="/events/:city"
          render={(routerProps) => <CityHomePage match={routerProps.match} />}
        />
      <Route exact path="/events/add" component={EventForm} />

    </main>
  </div>
  );
}

export default App;
