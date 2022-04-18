import { Route, Switch } from 'react-router';
import { Home } from './pages/Home/Home';
import { Header } from './shared/Header/Header';
import { CityPage } from './pages/CityPage/CityPage';
import { Container } from '@mui/material';

function App() {
  return (
    <Container maxWidth="lg">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/city/*" component={CityPage} />
      </Switch>
    </Container>
  );
}

export default App;
