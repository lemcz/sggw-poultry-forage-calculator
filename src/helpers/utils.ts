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

export function sumNumeric(values: number[]): number {
  return values.reduce((prev: number, curr: any): number => {
    const value = Number(curr);
    return isNaN(value) ? prev : prev + curr;
  }, 0);
}

export function getSuggestedPercentage(suggestedValues: { [key: string]: number }, item: any): number {
  const totalIngredientsAmount = sumNumeric(Object.values(suggestedValues));

  const suggestedValue = suggestedValues?.[item?.property];
  if (suggestedValue) {
    const PRECISION = 8;
    return parseFloat(((suggestedValue * 100) / totalIngredientsAmount).toFixed(PRECISION));
  }
  return 0;
}

export function formatNumberToDisplay(value: number): number {
  return parseFloat(value.toFixed(2));
}
