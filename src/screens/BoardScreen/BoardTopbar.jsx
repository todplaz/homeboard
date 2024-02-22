import { AppBar, Toolbar, Stack, Typography, IconButton} from '@mui/material';
import BackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../theme';
import { memo } from 'react';



const BoardTopbar = ({ name, lastUpdated, color, deleteBoard }) => {

  const navigate = useNavigate()

  return (
    <AppBar 
      position='static'
      sx={{
        borderBottom: '5px solid',
        borderColor: colors[color]
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between'}}>
        <Stack direction='row' alignItems='center' spacing={1}>
          <IconButton onClick={() => navigate('/boards')}>
            <BackIcon />
          </IconButton>
          <Typography variant='h6'> {name} </Typography>
        </Stack>
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography 
            variant='body2'
            display={{
              xs: 'none',
              sm: 'block'
            }}
          > 
            Last Updated: {lastUpdated} 
          </Typography>
          <IconButton onClick={deleteBoard}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default memo(BoardTopbar);