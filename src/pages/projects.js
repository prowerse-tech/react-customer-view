import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ProjectListResults } from '../components/projects/project-list-results';
import { ProjectListToolbar } from 'src/components/projects/project-list-toolbar';
import { DashboardLayout } from '../components/dashboard-layout';

const Projects = () => (
  <>
    <Head>
      <title>
        Projects | Material Kit
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
        {/* <ProjectListToolbar /> */}
        <Box sx={{ mt: 3 }}>
          <ProjectListResults />
        </Box>
      </Container>
    </Box>
  </>
);
Projects.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Projects;
