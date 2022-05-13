//This is a floating version of GoogleAuth, but it doesn't work because I don't know how to connect the callback function of the <div> element to my JS callback function

//Errors
  //If I pass callback as a string -> callback is not a function
  //If I pass it as a {function} -> pass a string or number...

//External imports
import { useEffect } from 'react'
import jwt_decode from 'jwt-decode';

//UI
import { Box } from '@mui/system';

//https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions

const GoogleAuth = () => {

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    if (!document.querySelector(`script[src="${src}"]`)) {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  function handleCredentialResponse(response) {
    console.log({ response });
    console.log(jwt_decode(response.credential));
    return 'hola'
  }

  return (
    <Box sx={{ margin: 'auto', marginBottom: '10px' }}>
      <div 
        id="g_id_onload"
        data-client_id="336036725628-aesklv8i1llnck0qkhae0o1hi10qm1fa.apps.googleusercontent.com"
        data-callback="handleCredentialResponse"
        data-theme='black'
      >
      </div>
    </Box>
  )
}

export default GoogleAuth
