//External imports
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

//Actions
import { getPostBySearch } from '../../actions/posts';
import { getTags } from '../../actions/tags';

//UI
import { Container, Grow, Grid, Paper, AppBar, TextField, Stack, Autocomplete, Button } from '@mui/material'

//Internal imports
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Pagination from '../Paginations/Pagination';

//styles
import { style } from './styles'


//This will be used for searching through the paramas in the url
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  // Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const query = useQuery();
  const page = query.get('page') || 1; //this looks if we have the url param 'page' if not it returns 1
  const searchQueryTerm = query.get('searchTerm'); //this looks if we have the url param searchQuery
  const searchQueryTags = query.get('searchTags');

  // Store-State
  const tags = useSelector((state) => state.tags)

  // States
  //todo{describe what is id doing here}
  const [currentId, setCurrentId] = useState(null)
  const [searchTerm, setSearchTerm] = useState('');
  const [searchTags, setSearchTags] = useState([]);

  //todo{posts was moved outside from here, so this code should be deleted}
  useEffect(() => {
    // dispatch(getPosts());
    dispatch(getTags());
  }, [currentId, dispatch]);

  const searchPost = () => {
    //todo{ver si necesito aplicar trim a los tags o al searchTerm}
    if(searchTerm || searchTags.length !== 0){
      //searchTerm is an string
      //searchTags is an array of Objects(_id, name) -> We have to convert them to pass them as params to the backend
      const aux = searchTags.map((tagObject) => tagObject['name']).join(',')
      dispatch(getPostBySearch({ searchTerm, searchTags: aux }));
      setSearchTerm('');
      setSearchTags([]);
      navigate(`/posts/search?searchTerm=${searchTerm || ''}&searchTags=${aux || ''}`);
    } else {
      navigate('/');
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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => {if(e.key === 'Enter'){searchPost()}}}
                />
                <Stack spacing={3}>
                  <Autocomplete 
                    value={searchTags}
                    onChange={(e, newValue) => {
                      setSearchTags(newValue);
                    }}
                    multiple
                    id="search-tags"
                    limitTags={3}
                    options={tags}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField 
                        {...params}
                        variant="outlined"
                        label="Search Tags"
                        placeholder="Search Tags"
                      />
                    )}
                  />
                </Stack>
                <Button variant='contained' color="secondary" onClick={searchPost}>Search</Button>
              </AppBar>
              <Form currentId={currentId} setCurrentId={setCurrentId}/>
              {!(searchQueryTags || searchQueryTerm) &&(
                <Paper sx={style.pagination} elevation={6}>
                  <Pagination page={page} />
                </Paper>
              )}
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  )
}

export default Home