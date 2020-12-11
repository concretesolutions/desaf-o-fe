
import './App.css';
import Welcome from './pages/Welcome'
import User from './pages/User'
import Notfound from './pages/Notfound'
import { BrowserRouter,Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Welcome}/>
      <Route exact path="/user" component={User}/>
      <Route exact path="/notfound" component={Notfound}/>
    
    </BrowserRouter>
    
  );
}

export default App;
