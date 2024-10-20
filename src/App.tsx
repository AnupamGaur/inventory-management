import "@fontsource/work-sans";
import './App.css'
import Sidebar from './components/Sidebar'
import Products from './pages/Products'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home  from './pages/Home';
import Addproduct from './pages/Addproduct';
import './index.css'
function App() {

  return (
    <BrowserRouter>
    
    <div className='grid grid-cols-10' >
      <section className='col-span-2 '>
        <Sidebar></Sidebar>
      </section>
      
      <section className='col-span-8'>
      <Routes>
      <Route path='/' element={<Products/>}/>
      <Route path='/products' element={<Products/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/addproduct' element={<Addproduct/>}/>
      </Routes>
      </section>
      
    </div>

    </BrowserRouter>
    
  )
}

export default App
