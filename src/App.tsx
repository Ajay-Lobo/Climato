
import './App.css'
import { BrowserRouter,Route, Routes } from 'react-router-dom'
import Layout from './components/layout'
import { ThemeProvider } from './context/theme-provider'
function App() {
 

  return (
   <BrowserRouter>
   <ThemeProvider defaultTheme='dark'>
   <Layout>
    <Routes>
    <Route path='/' element={''} />
    </Routes>
   </Layout>
   </ThemeProvider>
   </BrowserRouter> 
  )
}

export default App
