import { theme } from '../../mainTheme';

export const style = {
  root: {
    '& .MuiTextField-root': {
      marginY: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0 10px',
  },
  buttonSubmit: {
    marginBottom: "10px",
  },
};