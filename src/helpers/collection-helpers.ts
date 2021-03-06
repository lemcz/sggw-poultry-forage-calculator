import { isEqual } from 'lodash-es';

export function alreadyExists<T>(collection: T[], item: T): boolean {
  return collection.some((collectionItem) => isEqual(collectionItem, item));
}
