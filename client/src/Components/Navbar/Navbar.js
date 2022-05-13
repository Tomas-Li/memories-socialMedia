//External imports
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

//UI
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';

//Assets imports
import memories from '../../images/memories.png';

//Styles
import { style } from './styles';

const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    //todo{make the action}
    dispatch({ type: 'LOGOUT' });

    setUser(null);

    navigate('/');
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')))

  }, [location]);

  return (
  <AppBar sx={style.appBar} position='static' color='inherit'>
    <Box sx={style.brandContainer}>
      <Typography sx={style.heading} variant='h2' component={Link} to="/" align='center'>Memories</Typography>
      <img style={style.image} src={memories} alt="memories"/>
    </Box>
    <Toolbar sx={style.toolbar}>
      {user ? (
        <Box sx={style.profile}>
          <Avatar alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
          <Typography sx={style.userName} variant="h6">{user.result.name}</Typography>
          <Button sx={style.purple} variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Box>
      ) : (
        <Button sx={style.purple} component={Link} to="/auth" variant="cantained" color="primary">Sign In</Button>
      )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar