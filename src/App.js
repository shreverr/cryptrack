import './App.css';
import { Routes ,Route } from "react-router-dom";
import Exchanges from "./Components/Exchanges"
import Coins from './Components/Coins'
import CoinDetails from './Components/CoinDetails'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Exchanges/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/coins/:id' element={<CoinDetails/>}/>
    </Routes>
  );
}

export default App;