export const calculateSums = (collection: object[] = []) => {
  return collection.reduce((acc: number[], curr) => {
    Object.values(curr).forEach((value, idx) => {
      if (typeof value === 'number') {
        acc[idx] = acc[idx] ? acc[idx] + value : value;
      }
    });
    return acc;
  }, []);
};
