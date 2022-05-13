//External imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';

//Actions
import { getPosts } from '../../actions/posts';

//UI
import { Container, Grow, Grid } from '@mui/material'

//Internal imports
import Posts from '../Posts/Posts';
import Form from '../Form/Form';

//styles
import { style } from './styles'

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <>
      {/*<Grow> is for a simple animation! https://mui.com/material-ui/transitions/#grow */}
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
    </>
  )
}

export default Home