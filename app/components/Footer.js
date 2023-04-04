import React from 'react';
import useSWR from 'swr';
import Typography from '@mui/material/Typography';
import { RenderField, Model } from '@craftercms/experience-builder/react';
import { getModel } from '../lib/api';

export default function Footer() {
  const { data: model } = useSWR('/site/components/footer.xml', getModel);
  if (!model) return '';
  return (
    <Model model={model} component={Typography} variant="body2" align="center" margin="20px 0">
      <RenderField
        model={model}
        fieldId="copy_s"
        component="span"
        render={(copy_s) => copy_s?.replaceAll('$YEAR', new Date().getFullYear())}
      />
    </Model>
  );
}
