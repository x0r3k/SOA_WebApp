import logo from './logo.svg';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
// import Router from './routing';
import configureStore from './redux';

const store = configureStore();

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>

      </Provider>
    </BrowserRouter>
  );
}

export default App;
