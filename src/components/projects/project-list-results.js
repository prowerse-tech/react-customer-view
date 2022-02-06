import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
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

export const ProjectListResults = ({ customers, ...rest }) => {
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(0);


  const [error, setError] = useState(null);
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
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
        )
  }, [])

  const handleSelectAll = (event) => {
    let newSelectedCustomerIds;

    if (event.target.checked) {
      newSelectedCustomerIds = customers.map((customer) => customer.id);
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
    setLimit(event.target.value);
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
                  Project ID
                </TableCell>
                <TableCell>
                  Project Name
                </TableCell>
                <TableCell>
                  Project Address
                </TableCell>
                <TableCell>
                  Project Total Apartments
                </TableCell>
                <TableCell>
                  Scraping Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.slice(0, limit).map((project) => (
                <TableRow
                  hover
                  key={project.ProjectID}
                  selected={selectedCustomerIds.indexOf(project.ProjectID) !== -1}
                >
                  <TableCell>
                    {project.ProjectID}
                  </TableCell>
                  <TableCell>
                    {project.ProjectName}
                  </TableCell>
                  <TableCell>
                    {project.ProjectAddress}
                  </TableCell>
                  <TableCell>
                    {project.ProjectTotalApartments}
                  </TableCell>
                  <TableCell>
                    {project.ScrapingDate}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={projects.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};
