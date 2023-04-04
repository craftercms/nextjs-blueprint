import React from 'react';
import Box from '@mui/material/Box';
import { Model, RenderField } from '@craftercms/experience-builder/react';

export default function RichText({ model }) {
  return (
    <Model model={model} component={Box} sx={{ margin: '20px auto', maxWidth: '800px', px: 4 }}>
      <RenderField
        model={model}
        fieldId="content_html"
        renderTarget="dangerouslySetInnerHTML"
        render={(__html) => ({ __html })}
      />
    </Model>
  );
}
