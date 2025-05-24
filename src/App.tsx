import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import { Item, Items, Pokemon, Pokemons } from './pages';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='app'>
          <Routes>
            <Route path="/Pokemons/:name" element={<Pokemon/>}/>
            <Route path="/Pokemons" element={<Pokemons/>}/>
            <Route path="/items/:name" element={<Item/>}/>
            <Route path="/items" element={<Items/>}/>
            <Route path="/" element={<Pokemons/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
