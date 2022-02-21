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

export const ApartmentStatusListResults = ({ customers, ...rest }) => {
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statuses, setApartmentStauses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/status")
        .then(res => res.json())
        .then(
            (data) => {
                setIsLoaded(true);
                setApartmentStauses(data);
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
                  Status ID
                </TableCell>
                <TableCell>
                  Apartment
                </TableCell>
                <TableCell>
                  Reservation Status
                </TableCell>
                <TableCell>
                  Sales Price
                </TableCell>
                <TableCell>
                  Scraping Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {statuses.slice(page * limit, page * limit + limit).map((status) => (
                <TableRow
                  hover
                  key={status.StatusID}
                >
                  <TableCell>
                      {status.StatusID}
                  </TableCell>
                  <TableCell>
                    {status.Apartment}
                  </TableCell>
                  <TableCell>
                    {status.ReservationStatus}
                  </TableCell>
                  <TableCell>
                    {status.SalesPrice}
                  </TableCell>
                  <TableCell>
                    {status.ScrapingDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={statuses.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
