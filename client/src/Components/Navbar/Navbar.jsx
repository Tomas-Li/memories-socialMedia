//External imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import decode from 'jwt-decode';

//UI
import { AppBar, Avatar, Box, Button, Toolbar, Typography } from '@mui/material';

//Assets imports
import memories from '../../images/memories.png';

//Styles
import { style } from './styles';

const Navbar = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.authData)

  const logout = () => {
    //todo{make the action, at the moment there is no real action, just a re}
    dispatch({ type: 'LOGOUT' });
  }

  useEffect(() => {
    const token = user?.token;

    if(token) {
      const decodedToken = decode(token);

      //todo{checkear si realmente se deslogue en una hora}
      if(decodedToken.exp * 1000 < new Date().getTime()) logout();
    }


    // eslint-disable-next-line
  }, []);

  return (
  <AppBar sx={style.appBar} position='static' color='inherit'>
    <Box sx={style.brandContainer}>
      <Typography sx={style.heading} color="secondary" variant='h2' component={Link} to="/" align='center'>Memories</Typography>
      <img style={style.image} src={memories} alt="memories"/>
    </Box>
    <Toolbar sx={style.toolbar}>
      {user ? (
        <Box sx={style.profile}>
          <Avatar alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
          <Typography sx={style.userName} variant="h6">{user.result.name}</Typography>
          <Button sx={style.purple} variant="contained" color="secondary" onClick={logout}>Logout</Button>
        </Box>
      ) : (
        <Button component={Link} to="/auth" variant="contained" color="secondary">Sign In</Button>
      )}
    </Toolbar>
  </AppBar>
  )
}

export default Navbar