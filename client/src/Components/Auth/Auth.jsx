//External imports
import { useState } from 'react';

//Actions
import { signin, signup } from '../../actions/auth';

//UI
import { Avatar, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Lock } from '@mui/icons-material';

//Internal imports
import Input from './Input';
import GoogleAuth from './GoogleAuth';

//Styles
import { style } from './styles'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if(isSignUp){
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value})
  };

  const handleShowPassword = () => setShowPassword(() => !showPassword);

  const handleShowConfirmPassword = () => setShowConfirmPassword(() => !showConfirmPassword);

  const switchMode = () => {
    setIsSignUp(() => !isSignUp);
    setShowPassword(false);
    setShowConfirmPassword(false);
  }


  return (
    <Container component="main" maxWidth="xs">
      <Paper sx={style.paper} elevation={3}>
        <Avatar sx={style.avatar}>
          <Lock />
        </Avatar>
        <Typography variant="h5">{isSignUp ? 'Sign Up' : 'Sign In' }</Typography>
        <form style={style.form} onSubmit={handleSubmit} method="POST">
          <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type='email' />
            <Input 
            name="password" 
            label="Password" 
            handleChange={handleChange} 
            type={showPassword ? "text" : "password"}
            handleShowPassword={handleShowPassword}
            />
            { isSignUp && (
              <Input
               name="confirmPassword" 
               label="Repeat Password" 
               handleChange={handleChange} 
               type={showConfirmPassword ? "text" : "password"}
               handleShowPassword={handleShowConfirmPassword}
              />
            )}
            <Button type="submit" fullWidth variant="contained" color="primary" sx={style.submit}>
              { isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            { !isSignUp && < GoogleAuth /> }
          </Grid>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                { isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth