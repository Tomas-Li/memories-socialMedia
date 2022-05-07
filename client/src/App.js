import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getPosts } from './actions/posts';

import { Container, AppBar, Typography, Grow, Grid } from '@mui/material'

import Posts from './Components/Posts/Posts';
import Form from './Components/Form/Form';

import memories from './images/memories.png';

import { style } from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  //Test-level
  // console.log('APP level')

  return (
    <Container maxWidth="lg">
      {/* This is for the information display https://mui.com/material-ui/react-app-bar/ */}
      <AppBar sx={style.appBar} position='static' color='inherit'>
        <Typography sx={style.heading} variant='h2' align='center'>Memories</Typography>
        <img style={style.image} src={memories} alt="memories"/>
      </AppBar>
      
      {/*<Grow> is for a simple animation!
            https://mui.com/material-ui/transitions/#grow
      */}
      <Grow in>
        <Container>
          <Grid container sx={style.mainContainer}  justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={12} md={8}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} md={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </Container>
  )
}

export default App