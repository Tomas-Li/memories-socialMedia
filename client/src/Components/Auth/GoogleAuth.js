//External imports
import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

//UI
import { Box } from '@mui/system';

//https://developers.google.com/identity/gsi/web/guides/overview

const loadScript = (src) =>
new Promise((resolve, reject) => {
  if (document.querySelector(`script[src="${src}"]`)) return resolve()
  const script = document.createElement('script')
  script.src = src
  script.onload = () => resolve()
  script.onerror = (err) => reject(err)
  document.body.appendChild(script)
})

const GoogleAuth = () => {
  const googleButton = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const src = 'https://accounts.google.com/gsi/client'
    const id = "336036725628-aesklv8i1llnck0qkhae0o1hi10qm1fa.apps.googleusercontent.com"

    loadScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: id,
          callback: handleCredentialResponse,
        })
        google.accounts.id.renderButton(
          googleButton.current, 
          {
            theme: 'filled_black',
            size: 'large',
            shape: 'pill',
            text: 'signin',
            logo_alignment: 'left',
          } 
        )
      })
      .catch(console.error)

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`)
      if (scriptTag) document.body.removeChild(scriptTag)
    }
    // eslint-disable-next-line
  }, [])

  async function handleCredentialResponse(token) {
    //token has a 'ClientId' and a 'credential' atribute
    // console.log(jwt_decode(token.credential));

    //todo{if token... (to avoid errors)}
    //tood{checkear si el payload que se esta pasando esta bien}
    const result = jwt_decode(token.credential);

    try {
      //todo{cambiar por una action o al menos usar CONST.AUTH}
      dispatch({ type: 'AUTH', data: { result, token: token.credential }});

      navigate('/');
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <Box sx={{ margin: 'auto', marginBottom: '10px' }}>
      <div ref={googleButton}></div>
    </Box>
  )
}

export default GoogleAuth
