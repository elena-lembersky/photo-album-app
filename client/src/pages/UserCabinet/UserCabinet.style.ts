import { makeStyles, createStyles } from '@mui/styles';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: '100vh',
      padding: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }),
);

export default useStyles;
