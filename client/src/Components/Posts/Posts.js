//External imports
import React from 'react';
import { useSelector } from 'react-redux';

//UI
import { Grid, CircularProgress } from '@mui/material'

//Internal imports
import Post from './Post/Post'

//Styles
import { style } from './styles'

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts);

  //Test-level
  // console.log('Posts level')

  return (
    !posts.length ? <CircularProgress /> :(
      <Grid sx={style.mainContainer} container alignItems="stretch" spacing={3}>
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts