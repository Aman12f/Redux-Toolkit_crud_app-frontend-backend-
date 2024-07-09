import './App.css';
import Create from './components/Create';
import Home from './components/Home';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Home></Home>}></Route>
    <Route path='/create' element={<Create></Create>}></Route>
   </Routes>
   </BrowserRouter>
    
   </>
  );
}

export default App;
