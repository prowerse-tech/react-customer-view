import {
    Box,
    Typography
  } from '@mui/material';
  
  export const ProjectListToolbar = (props) => (
    <Box {...props}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          m: -1
        }}
      >
        <Typography
          sx={{ m: 1 }}
          variant="h4"
        >
          Projects
        </Typography>
      </Box>
    </Box>
  );
  