import {Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import {createContext, useState} from "react";

export const SearchContext = createContext();

function App() {

    const [searchValue, setSearchValue] = useState('');
    return (
        <div className="wrapper">
           <SearchContext.Provider value={{searchValue,setSearchValue}}>
               <Header/>
               <div className="content">
                   <div className="container">
                       <Routes>
                           <Route path='/' element={<Home searchValue={searchValue}/>}/>
                           <Route path='/cart' element={<Cart/>}/>
                           <Route path='*' element={<h1>Not Found</h1>}/>
                       </Routes>
                   </div>
               </div>
           </SearchContext.Provider>
        </div>
    );
}

export default App;
