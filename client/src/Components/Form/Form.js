//External imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import FileBase from 'react-file-base64';

//UI
import { TextField, Button, Typography, Paper, Box } from '@mui/material';

//Styles
import { style } from './styles';


const Form = ({ currentId, setCurrentId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.authData)

  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: ''
  });
  
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name })); 
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: ''
    });
  }

  const tagsFixer = (tags) => {
    const tagsArray = tags.split(',').map(tag => `${tag.trim().toLowerCase()}`);
    return tagsArray
  }


  if(!user?.result.name) {
    return(
      <Paper sx={style.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to be able to post and like!
        </Typography>
      </Paper>
    )
  } else {
  return (
      <Paper sx={style.paper}>
        <form autoComplete='off' noValidate style={style.form} onSubmit={handleSubmit}>
          <Typography variant="h6">{currentId ? 'Updating' : 'Creating'} a Memory!</Typography>
          <Box sx={style.root}>
            <TextField
              name="title"
              variant='outlined'
              label="Title"
              fullWidth
              value={postData.title}
              onChange={(e) => setPostData({ ...postData, title: e.target.value })}
            />
            <TextField
              name="message"
              variant='outlined'
              label="Message"
              fullWidth
              multiline rows={4}
              value={postData.message}
              onChange={(e) => setPostData({ ...postData, message: e.target.value })}
            />
            <TextField
              name="tags"
              variant='outlined'
              label="Tags (coma separated, no spaces)"
              fullWidth
              value={postData.tags}
              onChange={(e) => setPostData({ ...postData, tags: tagsFixer(e.target.value) })}
            />
          </Box>
          <Box sx={style.fileInput}>
            <FileBase
              type='file'
              multiple={false}
              onDone={({base64}) => setPostData({ ...postData, selectedFile: base64 })}
            />
          </Box>
          <Button sx={style.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>
            Submit
          </Button>
          <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
            Clear
          </Button>
        </form>
      </Paper>
    )
  }
}

export default Form