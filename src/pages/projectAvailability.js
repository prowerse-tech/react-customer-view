import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ProjectAvailabilityListResults } from 'src/components/projectAvailability/project-availability-list-results';
import { ProjectAvailabilityListToolbar } from 'src/components/projectAvailability/project-availability-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const ProjectAvailability = () => (
  <>
    <Head>
      <title>
        Project Availability
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
        <ProjectAvailabilityListToolbar />
        <Box sx={{ mt: 3 }}>
          <ProjectAvailabilityListResults />
        </Box>
      </Container>
    </Box>
  </>
);
ProjectAvailability.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default ProjectAvailability;
