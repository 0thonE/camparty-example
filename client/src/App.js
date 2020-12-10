import './App.scss';
import { Route, Switch } from 'react-router-dom';
import { Content } from 'carbon-components-react';
import { Navbar, GuardedRoute } from './components';
import {
  LandingPage,
  Camps,
  Camp,
  Login,
  NewCamp
} from './content';



function App() {
  return (
    <>
      <Navbar />
      <Content className="content-root-container">
        <Switch>
          <Route exact path="/camps" component={Camps} />
          <Route exact path="/camps/:id" component={Camp} />
          <GuardedRoute path="/create" component={NewCamp} />
          <Route path="/login" component={Login} />
          <Route path="/" component={LandingPage} />
        </Switch>
      </Content>
    </>
  );
}


export default App;
