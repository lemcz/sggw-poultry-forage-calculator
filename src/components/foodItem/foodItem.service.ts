import { FoodItemRecord } from '@/models/foodItem.model';

class FoodItemSingleton {
  headers = [
    { label: 'Produkt', property: 'label' },
    { label: '%', property: 'percentage' },
    { label: 'Cena', property: 'cost' },
    { label: 'Sucha masa', property: 'dryWeight' },
    { label: 'Energia', property: 'energy' },
    { label: 'Białko ogólne (g)', property: 'protein' },
    { label: 'Lizyna (g)', property: 'lysine' },
    { label: 'Metionina (g)', property: 'methionine' },
    { label: 'Tryptofan (g)', property: 'tryptophan' },
    { label: 'Arginina (g)', property: 'arginine' },
    { label: 'Ca (g)', property: 'calcium' },
    { label: 'P ogólny (g)', property: 'phosphorus' },
    { label: 'Na (g)', property: 'sodium' },
  ];

  products: FoodItemRecord[] = [
    {
      label: 'Śruta jęczmienna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
      lysine: 0,
    },
    {
      label: 'Śruta pszenna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta pszenżytnia',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta kukurydziana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z owsa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Otręby pszenne',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z bobiku',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z łubinu żółtego',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta z grochu',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Pełnotłusta śruta z rzepaku',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Pełnotlusta soja ekstrudowana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna rzepakowa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (42-46)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna sojowa (>46 b.o.)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'Śruta poekstrakcyjna słonecznikowa (obł)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      label: 'DDGS kukurydziany',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  getProducts() {
    return this.products;
  }

  getHeaders() {
    return this.headers;
  }
}

export const FoodItemService = new FoodItemSingleton();
