import React from "react";
import { getModel, getNav } from "../lib/api";
import { contentTypeMap, useCrafterAppContext } from "./_app";
import Typography from "@mui/material/Typography";
import {
  Guest,
  RenderField,
  Field,
  ContentType,
} from "@craftercms/experience-builder/react";

export default function Index({ model }) {
  const { isAuthoring } = useCrafterAppContext();
  return (
    <Guest path={model.craftercms.path} isAuthoring={isAuthoring}>
      <RenderField
        model={model}
        fieldId="title_s"
        component={Typography}
        variant="title"
        componentProps={{
          // Component props can simply be sent as props to RenderField and
          // they would be passed down to Typography, however, because there's
          // a prop name collision (i.e. `component`) we can use componentProps
          // to supply the component prop directly to Typography.
          component: "h1"
        }}
        align="center"
        sx={{ m: 1 }}
      />
      <RenderField
        model={model}
        component="div"
        fieldId="content_o"
        format={(content_o) =>
          content_o?.map((component, index) => (
            <Field
              key={`${component.craftercms.id}_${index}`}
              model={model}
              index={index}
              fieldId="content_o"
            >
              <ContentType model={component} contentTypeMap={contentTypeMap} />
            </Field>
          ))
        }
      />
    </Guest>
  );
}

export async function getStaticProps() {
  const model = await getModel();
  return { props: { model }, };
}
