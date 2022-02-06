import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ApartmentListResults } from 'src/components/apartments/apartment-list-results';
import { ApartmentListToolbar } from 'src/components/apartments/apartment-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Apartments = () => (
  <>
    <Head>
      <title>
        Apartmnents | Material Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth={false}>
        {/* <ApartmentListToolbar /> */}
        <Box sx={{ mt: 3 }}>
          <ApartmentListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Apartments.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Apartments;
