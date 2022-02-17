import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ApartmentStatusListResults } from 'src/components/apartmentStatus/apartment-status-list-results';
import { ApartmentStatusListToolbar } from 'src/components/apartmentStatus/apartment-status-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const ApartmentStatus = () => (
  <>
    <Head>
      <title>
        Apartment Status 
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
        <ApartmentStatusListToolbar />
        <Box sx={{ mt: 3 }}>
          <ApartmentStatusListResults />
        </Box>
      </Container>
    </Box>
  </>
);
ApartmentStatus.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ApartmentStatus;
