import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Generations, Item, Items, Pokemon, Pokemons } from './pages';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='app'>
          <Routes>
            <Route path="/generations/:generation/:name" element={<Pokemon />} />
            <Route path="/generations/:generation" element={<Pokemons />} />
            <Route path="/items/:name" element={<Item />} />
            <Route path="/items" element={<Items />} />
            <Route path="/" element={<Generations />} />
            <Route path="*" element={<Generations />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
