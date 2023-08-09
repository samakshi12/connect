import { Switch, Route, BrowserRouter } from 'react-router-dom';
import Signin from './pages/Signin';
import Home from './pages/Signin';
import 'rsuite/dist/styles/rsuite-default.css';
import './styles/main.scss';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ProfileProvider } from './context/profile.context';

function App() {
  return (
    <ProfileProvider>
       <BrowserRouter>
      <Switch>
        <PublicRoute path="/signin"><Signin/></PublicRoute>
        <PrivateRoute path="/"><Home/></PrivateRoute>
      </Switch>
    </BrowserRouter>
    </ProfileProvider>
   
  );
}

export default App;
