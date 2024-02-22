import { Grid, Stack, Typography, IconButton, Box } from '@mui/material';
import OpenIcon from '@mui/icons-material/Launch';
import { colors } from '../../theme';
import { useNavigate } from 'react-router-dom';



const BoardCard = ({ name, color, createdAt, id }) => {
  
  const navigate = useNavigate()

  return (
    <Grid item xs={12} sm={3}>
      <Stack 
        p={2} 
        bgcolor='background.paper' 
        borderLeft='5px solid' 
        borderColor={colors[color]}
      >
        <Stack 
          direction='row' 
          justifyContent='space-between' 
          alignItems='center'
        >
          <Box width='50%'>
            <Typography 
              fontWeight={400} 
              variant='h6'
              textOverflow='ellipsis'
              overflow='hidden'
              whiteSpace='nowrap'
            >
              {name}
            </Typography>
          </Box>
          <IconButton onClick={() => navigate(`/boards/${id}`)} size='small'>
            <OpenIcon />
          </IconButton>
        </Stack>
        <Typography variant='caption'>
          Create at: {createdAt}
        </Typography>
      </Stack>
    </Grid>
  );
};

export default BoardCard;