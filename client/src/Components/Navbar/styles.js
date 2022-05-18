import { theme } from '../../mainTheme';
import { deepPurple } from '@mui/material/colors'

export const style = {
  appBar: {
    borderRadius: 5,
    margin: "30px 0",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "img": {
      width: 50
    }
  },
  heading: {
    marginLeft:  "20px",
    textDecoration: 'none',
    fontWeight: '500'
  },
  image: {
    marginLeft: 15,
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
    '&:hover':{
      color: theme.palette.getContrastText(deepPurple[200]),
      backgroundColor: deepPurple[300],
    }
  },
}; 


