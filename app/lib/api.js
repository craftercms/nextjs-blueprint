import {
  getDescriptor,
  parseDescriptor,
  getNavTree,
  urlTransform
} from '@craftercms/content';
import { firstValueFrom, map, switchMap } from 'rxjs';

export async function getModel(path = "/site/website/index.xml") {
  return await firstValueFrom(
    getDescriptor(path, { flatten: true }).pipe(
      map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: true }))
      // Can use this for debugging purposes.
      // tap(console.log)
    )
  );
}

export async function getModelByUrl(webUrl = '/') {
  return await firstValueFrom(
    urlTransform('renderUrlToStoreUrl', webUrl).pipe(
      switchMap((path) => getDescriptor(path, { flatten: true }).pipe(
        map((descriptor) => parseDescriptor(descriptor, { parseFieldValueTypes: true }))
      ))
    )
  );
}

export async function getInitialProps(context) {
  const model = await getModelByUrl(context.pathname);
  return { model };
}

export async function getNav() {
  return await firstValueFrom(
    getNavTree("/site/website", 1).pipe(
      // Flatten the nav so that home shows at the same level as the children.
      map((navigation) => [
        {
          label: navigation.label,
          url: navigation.url,
          active: navigation.active,
          attributes: navigation.attributes
        },
        ...navigation.subItems,
      ])
    )
  );
}
