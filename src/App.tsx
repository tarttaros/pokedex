import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { Regions, Item, Items, Pokemon, Pokemons, Ability, Abilities } from './pages';


function App() {
  return (
    <div className="App">
      <Router>
        <div className='app'>
          <Routes>
            <Route path="/regions/:region/:name" element={<Pokemon />} />
            <Route path="/regions/:region" element={<Pokemons />} />
            <Route path="/items/:name" element={<Item />} />
            <Route path="/items" element={<Items />} />
            <Route path="/abilities/:name" element={<Ability />} />
            <Route path="/abilities" element={<Abilities />} />
            <Route path="/" element={<Regions />} />
            <Route path="*" element={<Regions />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
