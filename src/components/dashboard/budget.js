import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import React, { useState, useEffect } from 'react';

export const Budget = (props) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [statuses, setStatuses] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/status")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setStatuses(data);
            },
            (error) => {
                setIsLoaded(true);
            }
        )
  }, [])


  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  function subtotal(statuses) {
    return statuses.map(({ SalesPrice }) => SalesPrice).reduce((sum, i) => sum + i, 0);
  }
  const invoiceSubtotal = subtotal(statuses);

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
            Actual Price
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            {/* $24k */}
            {ccyFormat(invoiceSubtotal)}
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
  );
};
