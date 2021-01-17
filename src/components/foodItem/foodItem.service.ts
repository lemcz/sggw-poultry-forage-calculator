import { FoodItemRecord } from '@/models/foodItem.model';

class FoodItemSingleton {
  headers = [
    'Produkt',
    '%',
    'Cena',
    'Sucha masa',
    'Energia',
    'Białko ogólne (g)',
    'Lizyna (g)',
    'Metionina (g)',
    'Tryptofan (g)',
    'Arginina (g)',
    'Ca (g)',
    'P ogólny (g)',
    'Na (g)',
  ];

  products: FoodItemRecord[] = [
    {
      name: 'Śruta jęczmienna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
      lysine: 0,
    },
    {
      name: 'Śruta pszenna',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta pszenżytnia',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta kukurydziana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta z owsa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Otręby pszenne',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta z bobiku',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta z łubinu żółtego',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta z grochu',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Pełnotłusta śruta z rzepaku 00',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Pełnotlusta soja ekstrudowana',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta poekstrakcyjna rzepakowa',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta poekstrakcyjna sojowa (42-46)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta poekstrakcyjna sojowa (>46 b.o.)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'Śruta poekstrakcyjna słonecznikowa (obł)',
      percentage: 0,
      cost: 0,
      dryWeight: 0,
      energy: 0,
      protein: 0,
    },
    {
      name: 'DDGS kukurydziany',
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
