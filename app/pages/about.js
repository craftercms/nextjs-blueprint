import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ExperienceBuilder, RenderField } from '@craftercms/experience-builder/react';
import { getInitialProps } from '../lib/api';
import { useCrafterAppContext } from './_app';
import Footer from '../components/Footer';

export default function About({ model }) {
  const { isAuthoring } = useCrafterAppContext();
  return (
    <ExperienceBuilder model={model} isAuthoring={isAuthoring}>
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <RenderField
            model={model}
            fieldId="title_s"
            component={Typography}
            componentProps={{ component: "h1" }}
            variant="title"
            gutterBottom
            align="center"
          />
        </Box>
      </Container>
      <Footer />
    </ExperienceBuilder>
  );
}

About.getInitialProps = getInitialProps;
