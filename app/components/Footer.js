import React from 'react';
import Typography from '@mui/material/Typography';

export default function Footer({ model = { copy_s: 'Copyright © CrafterCMS' } }) {
  return (
    <Typography variant="body2" align="center" margin="20px 0">
      {`${model.copy_s} ${new Date().getFullYear()}`}
    </Typography>
  );
}
