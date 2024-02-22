import { AppBar, Toolbar, Button, Stack, useMediaQuery, IconButton } from '@mui/material';
import HomeworkImg from '../../components/utils/HomeworkImg';
import homework from '../../assets/image/homework.svg';
import LogoutIcon from '@mui/icons-material/ExitToApp';
import CreateBoardIcon from '@mui/icons-material/AddCircle';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';


const Topbar = ({openModal}) => {
  const isXs = useMediaQuery(theme => theme.breakpoints.only('xs'))
  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
           justifyContent: 'space-between'
          }}
      >
        <HomeworkImg
         sx={{
          height:'25px'
         }}
         src={ homework } alt='homework logo' />
        <Stack direction='row' spacing={2}>
          {isXs ? (
            <>
              <IconButton onClick={openModal} color='primary'>
                <CreateBoardIcon />
              </IconButton>
              <IconButton onClick={() => signOut(auth)}>
                <LogoutIcon />
              </IconButton>
            </>
            ) : (
            <>
            <Button onClick={openModal} variant='contained'>
              Create Board
            </Button>
            <Button 
              onClick={() => signOut(auth)}
              startIcon={<LogoutIcon />} 
              color='inherit'
            >
              Logout
            </Button>
          </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;