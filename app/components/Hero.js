import React, { forwardRef, useEffect, useMemo, useRef } from 'react';
import Box from '@mui/material/Box';
import Image from 'next/legacy/image';
import Typography from '@mui/material/Typography';
import { Model, RenderField } from '@craftercms/experience-builder/react';

/* NextJS' Image component does not provide a ref — which RenderField (Crafter)
* needs to add the authoring tools on top of the element. */

// let imageWithRefId = 'imgWithRef';
// let imageWithRefIdCount = 0;

const ImageWithRef = forwardRef((props, ref) => {
  const id = props.id;
  const elementRef = useRef();
  useEffect(() => {
    if (ref) {
      const el = document.querySelector(`#${id}`);
      if (el && el !== elementRef.current) {
        elementRef.current = el;
        if (typeof ref === 'function')
          ref(el);
        else
          ref.current = el
      }
    }
  });
  return <Image {...props} id={id} />
});

export default function Hero(props) {
  const { model } = props;
  return (
    <>
      <Model model={model} component={Box} sx={{ position: 'relative', overflow: 'hidden' }}>
        <RenderField
          alt=""
          id="heroBackground_s"
          unoptimized
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          renderTarget="src"
          model={model}
          component={ImageWithRef}
          fieldId="background_s"
          render={(img) => `${process.env.NEXT_PUBLIC_CRAFTERCMS_HOST_NAME}${img}`}
        />
        <RenderField
          model={model}
          fieldId="title_s"
          component={Typography}
          gutterBottom
          variant="h2"
          sx={{ position: 'relative', color: '#fff', m: 10 }}
          align="center"
        />
      </Model>
    </>
  );
}
