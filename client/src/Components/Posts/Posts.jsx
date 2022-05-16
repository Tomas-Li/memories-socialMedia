//External imports
import React from 'react';
import { useSelector } from 'react-redux';

//UI
import { Grid, CircularProgress, Typography } from '@mui/material'

//Internal imports
import Post from './Post/Post'

//Styles
import { style } from './styles'

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  if(!posts.length && !isLoading) return (
    <Typography variant="h3" sx={{color:"white"}}>Nothing to show</Typography>
  )

  return (
    isLoading ? <CircularProgress /> :(
      <Grid sx={style.mainContainer} container spacing={3}>
        {posts.map(post => (
          <Grid item key={post._id} xs={12} sm={12} md={6} lg={4}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  )
}

export default Posts