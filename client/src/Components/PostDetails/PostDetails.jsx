//External imports
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment';

//Actions
import { getPost, getPostBySearch } from '../../actions/posts';

//UI
import { Box, CircularProgress, Divider, Paper, Typography } from '@mui/material'

//Styles
import { style } from './styles';

const PostDetails = () => {
  //Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  
  //Store-state
  const { post, posts, isLoading } = useSelector((state) => state.posts);

  //Local variables
  const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if(post) {
      //The following dispatch will populate the posts inside the Store (aka the posts var created above), base on the tags that we are using in our actual post
      dispatch(getPostBySearch({ searchTerm: '', searchTags: post?.tags.join(',')}))
    }
  }, [post])

  const openPost = (_id) => navigate(`/posts/${_id}`)

// PostDetails Component:
  if(!post) return null;

  if(isLoading){
    return (
      <Paper elevation={6} sx={style.loadingPaper}>
        <CircularProgress size="7em"/>
      </Paper>
    )
  }

  return (
    <Paper>
      <Box sx={style.card}>
        <Box sx={style.section}>
          <Typography variant="h3" component="h2">{post.title}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
          <Typography variant="h6">Created by: {post.name}</Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
          <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography>
          <Divider style={{ margin: '20px 0' }} />
        </Box>
        <Box sx={style.imageSection}>
          <img style={style.media} src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </Box>
      </Box>
      {recommendedPosts.length && (
        <Box sx={style.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider  />
          <Box sx={style.recommendedPosts}>
            {recommendedPosts.map(recPost => (
              <Box sx={{margin: '20px', cursor: 'pointer'}} onClick={() => openPost(recPost._id)} key={recPost._id}>
                <Typography gutterBottom variant="h6">{recPost.title}</Typography>
                <Typography gutterBottom variant="subtitle2">{recPost.name}</Typography>
                <Typography gutterBottom variant="subtitle2">{recPost.message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes:{recPost.likes.length}</Typography>
                <img src={recPost.selectedFile} width="200px"/>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Paper>
  )
}

export default PostDetails