//External imports
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FileBase from 'react-file-base64';

//Actions
import { createPost, updatePost } from '../../actions/posts';
import { createTags } from '../../actions/tags';

//UI
import { Autocomplete, Box, Button, Chip, Paper, Stack, TextField, Typography } from '@mui/material';

//Styles
import { style } from './styles';


const Form = ({ currentId, setCurrentId }) => {
  // Hooks
  const dispatch = useDispatch();

  // Store-state
  const user = useSelector((state) => state.auth.authData);
  const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null);
  const tags = useSelector((state) => state.tags);

  // State
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: [],
    selectedFile: ''
  });

  useEffect(() => {
    if(post) setPostData(post);
  }, [post])


  const handleSubmit = (e) => {
    e.preventDefault();

    if(currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
      dispatch(createTags({ tags: postData.tags }));
      //todo{verificacion de tags cuando se hace update tambien}
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name })); 
      dispatch(createTags({ tags: postData.tags }))
    }
    clear();
  };

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: '',
      message: '',
      tags: [],
      selectedFile: ''
    });
  }

  //Aca empieza el componente
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
            {/* 
              The following Component is the autocomplete which allows new entries
                -We are using an isolated new state as we can't add to the store state until is a confirmed changed inside the DB.
                -Onchange will give us an event and a new value (which is all the chips in our textfield)
             */}
            <Stack spacing={3}>
              <Autocomplete
              value={postData.tags}
              onChange={(event, newValue) => {
                setPostData({ ...postData, tags: newValue})
              }}
              multiple
              limitTags={5}
              id="tags-filled"
              options={tags.map((option) => option.name)}
              freeSolo
              renderTags={(value, getTagProps) => value.map((option, index) => (
                  <Chip 
                    variant="outlined"
                    label={option}
                    {...getTagProps({ index })}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  label="Tags" 
                  placeholder="Tags"
                />
              )}
              />
            </Stack>
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