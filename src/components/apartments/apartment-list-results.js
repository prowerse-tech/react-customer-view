import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';

export const ApartmentListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [page, setPage] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [apartments, setApartments] = useState([]);


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

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = apartments.map((apartment) => apartment.id);
    } else {
      newSelectedCustomerIds = [];
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedCustomerIds.indexOf(id);
    let newSelectedCustomerIds = [];

    if (selectedIndex === -1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds, id);
    } else if (selectedIndex === 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(1));
    } else if (selectedIndex === selectedCustomerIds.length - 1) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(selectedCustomerIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedCustomerIds = newSelectedCustomerIds.concat(
        selectedCustomerIds.slice(0, selectedIndex),
        selectedCustomerIds.slice(selectedIndex + 1)
      );
    }

    setSelectedCustomerIds(newSelectedCustomerIds);
  };

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
                {/* <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedCustomerIds.length === customers.length}
                    color="primary"
                    indeterminate={
                      selectedCustomerIds.length > 0
                      && selectedCustomerIds.length < customers.length
                    }
                    onChange={handleSelectAll}
                  />
                </TableCell> */}
                <TableCell>
                  Apartment ID
                </TableCell>
                <TableCell>
                  Apartment Name
                </TableCell>
                <TableCell>
                  Apartment Address
                </TableCell>
                <TableCell>
                  Number of Rooms
                </TableCell>
                <TableCell>
                  Apartment Floor
                </TableCell>
                <TableCell>
                  Apartment Size
                </TableCell>
                <TableCell>
                  Total Area Size
                </TableCell>
                <TableCell>
                  Balcony Size
                </TableCell>
                <TableCell>
                  Scraping Date
                </TableCell>
                <TableCell>
                  Project
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apartments.slice(page * limit, page * limit + limit).map((apartment) => (
                <TableRow
                  hover
                  key={apartment.id}
                  selected={selectedCustomerIds.indexOf(apartment.id) !== -1}
                >
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedCustomerIds.indexOf(project.id) !== -1}
                      onChange={(event) => handleSelectOne(event, project.id)}
                      value="true"
                    />
                  </TableCell> */}
                  <TableCell>
                      {apartment.ApartmentID}
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      {/* <Avatar
                        src={project.avatarUrl}
                        sx={{ mr: 2 }}
                      >
                        {getInitials(project.name)}
                      </Avatar> */}
                      <Typography
                        color="textPrimary"
                        variant="body1"
                      >
                        {apartment.ApartmentName}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {apartment.ApartmentAddress}
                  </TableCell>
                  {/* <TableCell>
                    {`${customer.address.city}, ${customer.address.state}, ${customer.address.country}`}
                  </TableCell> */}
                  <TableCell>
                    {apartment.NumberOfRooms}
                  </TableCell>
                  <TableCell>
                    {apartment.AppartmentFloor}
                  </TableCell>
                  <TableCell>
                    {apartment.ApartmentSize}
                  </TableCell>
                  <TableCell>
                    {apartment.TotalAreaSize}
                  </TableCell>
                  <TableCell>
                    {apartment.BalconySize}
                  </TableCell>
                  <TableCell>
                    {apartment.ScrapingDate}
                    {/* {format(project.ScrapingDate, 'dd/MM/yyyy')} */}
                  </TableCell>
                  <TableCell>
                    {apartment.Project}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={apartments.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

ApartmentListResults.propTypes = {
  customers: PropTypes.array.isRequired
};
