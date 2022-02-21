import { Avatar, Box, Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import React, { useState, useEffect } from 'react';

export const TotalProjects = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [projects, setProjects] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setProjects(data);
            },
        )
  }, [])

  return (
    <Card
    sx={{ height: '100%' }}
    {...props}
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            Total Projects
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {projects.length}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
          >
            <InsertChartIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={100}
          variant="determinate"
        />
      </Box>
    </CardContent>
  </Card>
  );
};
