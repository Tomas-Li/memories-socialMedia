//External imports
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//UI
import { Container} from '@mui/material'

//Internal imports
import Navbar from './Components/Navbar/Navbar';
import Home from './Components/Home/Home';
import PostDetails from './Components/PostDetails/PostDetails';
import Auth from './Components/Auth/Auth'
import { useSelector } from 'react-redux';


const App = () => {

  const user = useSelector((state) => state.auth.authData);

  return (
    <Router>
      <Container maxWidth="xl">
        <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/posts"/>} />
            <Route path="/posts" element={<Home />} />
            <Route path="/posts/search" element={<Home />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/auth" element={!user ? <Auth /> : <Navigate to='/posts' />}/>
          </Routes>
      </Container>
    </Router>
  )
}

export default App