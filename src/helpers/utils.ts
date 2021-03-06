import { FoodItemRecord } from '@/models/foodItem.model';

export function convertLabelToProperty(label = ''): string {
  return label
    .toLowerCase()
    .split(' ')
    .join('_');
}

// TODO move 'property' prop to the type / interface
export function extendFoodItemByProperty(item: FoodItemRecord): FoodItemRecord & { property: string } {
  return {
    ...item,
    property: convertLabelToProperty(item.label as string),
  };
}

export function getSuggestedPercentage(suggestedValues: { [key: string]: number }, item: any): number {
  const totalIngredientsAmount = Object.values(suggestedValues).reduce(
    (acc: number, curr: number): number => acc + curr,
    0,
  );

  const suggestedValue = suggestedValues?.[item?.property];
  if (suggestedValue) {
    const PRECISION = 8;
    return parseFloat(((suggestedValue * 100) / totalIngredientsAmount).toFixed(PRECISION));
  }
  return 0;
}
