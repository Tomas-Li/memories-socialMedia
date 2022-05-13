//External imports
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//UI
import { Container} from '@mui/material'

//Internal imports
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import Auth from './Components/Auth/Auth'


const App = () => {
  return (
    <Router>
      <Container maxWidth="lg">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/auth" element={<Auth />}/>
          </Routes>
      </Container>
    </Router>
  )
}

export default App