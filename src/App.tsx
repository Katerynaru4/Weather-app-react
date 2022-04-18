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
        <Route path="/" exact component={Home} />
        <Route path="/*" component={CityPage} />
      </Switch>
    </Container>
  );
}

export default App;
