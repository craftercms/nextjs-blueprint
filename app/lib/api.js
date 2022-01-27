import {
  getDescriptor,
  parseDescriptor,
  getNavTree,
} from "@craftercms/content";
import { firstValueFrom, map } from "rxjs";

export async function getModel(path = "/site/website/index.xml") {
  return await firstValueFrom(
    getDescriptor(path, { flatten: true }).pipe(
      map(parseDescriptor)
      // Can use this for debugging purposes.
      // tap(console.log)
    )
  );
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
