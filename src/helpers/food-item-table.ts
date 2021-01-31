import { FieldType } from '@/helpers/food-item.service';

export function getHeaderType(type?: FieldType): 'TextField' | 'NumberField' | 'SelectField' | '' {
  switch (type) {
    case FieldType.Text:
      return 'TextField';
    case FieldType.Number:
      return 'NumberField';
    case FieldType.Select:
      return 'SelectField';
  }
  return '';
}
