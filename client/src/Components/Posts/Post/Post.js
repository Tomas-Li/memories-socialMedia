//External imports
import { useDispatch } from 'react-redux';
import moment from 'moment';

//Actions
import { deletePost, likePost } from '../../../actions/posts';

//Internal imports
import Likes from './Likes';

//UI
import { Box, Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

//Styles
import { style } from './styles'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card sx={style.card}>
      <CardMedia sx={style.media} image={post.selectedFile} title={post.title}/>
      <Box sx={style.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
      </Box>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Box sx={style.overlay2}>
          <Button sx={{color: 'white'}} size="small" onClick={() => setCurrentId(post._id)}>
            <MoreHorizIcon fontSize='default' />
          </Button>
        </Box>
      )}
      <Typography sx={style.title} variant="h6" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant="body2" component="p" gutterBottom>{post.message}</Typography>
      </CardContent>
      <Box sx={style.details}>
        <Typography variant="body2" color="textSecondary">{post.tags.map(tag => `#${tag} `)}</Typography>
      </Box>
      <CardActions sx={style.cardActions}>
        <Button size='small' color='primary' disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes post={post} />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post