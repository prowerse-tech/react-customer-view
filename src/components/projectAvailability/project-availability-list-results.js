import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';

export const ProjectAvailabilityListResults = ({ customers, ...rest }) => {
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [availabilities, setProjectAvailabilities] = useState([]);


  useEffect(() => {
    fetch("http://127.0.0.1:8000/availability")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setProjectAvailabilities(data);
            },
            (error) => {
                setIsLoaded(true);
            }
        )
  }, [])

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Availibility ID
                </TableCell>
                <TableCell>
                  Project
                </TableCell>
                <TableCell>
                  Project Available Apartments
                </TableCell>
                <TableCell>
                  Scraping Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {availabilities.slice(page * limit, page * limit + limit).map((availability) => (
                <TableRow
                  hover
                  key={availability.AvailibilityID}
                >
                  <TableCell>
                    {availability.AvailibilityID}
                  </TableCell>
                  <TableCell>
                    {availability.Project}
                  </TableCell>
                  <TableCell>
                    {availability.ProjectAvailableApartments}
                  </TableCell>
                  <TableCell>
                    {availability.ScrapingDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={availabilities.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
