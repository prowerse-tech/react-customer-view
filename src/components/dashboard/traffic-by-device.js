import { Doughnut } from 'react-chartjs-2';
import { Box, Card, CardContent, CardHeader, Divider, StepIcon, Typography, useTheme } from '@mui/material';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import PhoneIcon from '@mui/icons-material/Phone';
import TabletIcon from '@mui/icons-material/Tablet';
import React, { useState, useEffect } from 'react';

export const TrafficByDevice = (props) => {
  const theme = useTheme();

  const [isLoaded, setIsLoaded] = useState(false);
  const [apartments, setApartments] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/apartments")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setApartments(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
  }, [])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/projects")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setProjects(data);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
  }, [])

  const totalApartments = apartments.length;
  const totalProjects = projects.length;

  const data = {
    datasets: [
      {
        data: [totalApartments, totalProjects],
        backgroundColor: ['#3F51B5', '#e53935'],
        borderWidth: 8,
        borderColor: '#FFFFFF',
        hoverBorderColor: '#FFFFFF'
      }
    ],
    labels: ['Available', 'Leased']
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  const devices = [
    {
      title: 'Available',
      value: 70,
      icon: TabletIcon,
      color: '#3F51B5'
    },
    {
      title: 'Leased',
      value: 30,
      icon: TabletIcon,
      color: '#E53935'
    }
  ];

  return (
    <Card {...props}>
      <CardHeader title="Available Units" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={data}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {devices.map(({
            color,
            icon: Icon,
            title,
            value
          }) => (
            <Box
              key={title}
              sx={{
                p: 1,
                textAlign: 'center'
              }}
            >
              <Icon color="action" />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {title}
              </Typography>
              <Typography
                style={{ color }}
                variant="h4"
              >
                {value}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};
