import { Stack, Typography } from '@mui/material'
const NoBoards = () => {
  return (
    <Stack textAlign='center' spacing={1} mt={15} >
    <Typography variant='h5'>
      No board created
    </Typography>
    <Typography>
      Create your first board today
    </Typography>
  </Stack>
  );
};

export default NoBoards;