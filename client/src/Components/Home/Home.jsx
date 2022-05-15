//External imports
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

//Actions
import { getPosts } from '../../actions/posts';

//UI
import { Container, Grow, Grid, Paper, AppBar, TextField, Chip, Stack, Autocomplete, Button } from '@mui/material'

//Internal imports
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Paginations/Pagination';

//styles
import { style } from './styles'


//This is for searching through tags
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  //todo{describe what is id doing here}
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState('');


  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1; //this looks if we have the url param 'page' if not it returns 1
  const searchQuery = query.get('searchQuery'); //this looks if we have the url param searchQuery

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  //function that search through the posts (based on the tags)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter'){
      //todo{search post code}
    }
  }


  return (
    <>
      {/*<Grow> is for a simple animation! https://mui.com/material-ui/transitions/#grow */}
      <Grow in>
        <Container maxWidth="xl">
          {/* todo{have to change the following class for gridContainer...} */}
          <Grid container sx={style.gridContainer}  justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item xs={12} sm={6} md={9}>
              <Posts setCurrentId={setCurrentId}/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <AppBar sx={style.appBarSearch} position="static" color="inherit">
                <TextField 
                  name="search" 
                  variant='outlined'
                  label="Search Memories"
                  fullWidth
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                {/* <Stack spacing={3}>
                  <Autocomplete 
                    multiple={}
                  />
                </Stack> */}


                {/* <Chip 
                  sx={style.chip}
                  value={tags}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  label="Search Tags"
                  variant="outlined"
                /> */}

                <Button color="primary" onClick={() => {}}>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              <Paper sx={style.pagination} elevation={6}>
                <Pagination />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Home