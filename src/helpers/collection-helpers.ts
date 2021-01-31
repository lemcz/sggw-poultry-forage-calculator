import { isEqual } from 'lodash-es';

export function calculateSums(collection: object[] = []): number[] {
  return collection.reduce((acc: number[], curr) => {
    Object.values(curr).forEach((value, idx) => {
      if (typeof value === 'number') {
        acc[idx] = acc[idx] ? acc[idx] + value : value;
      }
    });
    return acc;
  }, []);
}

export function alreadyExists<T>(collection: T[], item: T): boolean {
  return collection.some((collectionItem) => isEqual(collectionItem, item));
}
