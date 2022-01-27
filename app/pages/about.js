import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Guest, RenderField } from '@craftercms/experience-builder/react';
import { getModel } from '../lib/api';
import { useCrafterAppContext } from './_app';

export default function About({ model }) {
  const { isAuthoring } = useCrafterAppContext();
  return (
    <Guest path={model.craftercms.path} isAuthoring={isAuthoring}>
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
    </Guest>
  );
}

export async function getStaticProps() {
  const model = await getModel("/site/website/about/index.xml");
  return { props: { model } };
}
