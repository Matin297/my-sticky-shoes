import { faker } from "@faker-js/faker";

faker.seed(123);

const BRANDS = [
  {
    title: "Nike",
    id: faker.string.uuid(),
  },
  {
    title: "Adidas",
    id: faker.string.uuid(),
  },
  {
    title: "Puma",
    id: faker.string.uuid(),
  },
  {
    title: "New Balance",
    id: faker.string.uuid(),
  },
  {
    title: "Reebok",
    id: faker.string.uuid(),
  },
  {
    title: "Under Armour",
    id: faker.string.uuid(),
  },
  {
    title: "Vans",
    id: faker.string.uuid(),
  },
  {
    title: "Converse",
    id: faker.string.uuid(),
  },
] as const;

const CATEGORIES = [
  {
    title: "Running",
    id: faker.string.uuid(),
  },
  {
    title: "Casual",
    id: faker.string.uuid(),
  },
  {
    title: "Formal",
    id: faker.string.uuid(),
  },
  {
    title: "Sports",
    id: faker.string.uuid(),
  },
  {
    title: "Boots",
    id: faker.string.uuid(),
  },
  {
    title: "Sandals",
    id: faker.string.uuid(),
  },
  {
    title: "Sneakers",
    id: faker.string.uuid(),
  },
  {
    title: "Loafers",
    id: faker.string.uuid(),
  },
] as const;

const COLORS = [
  {
    title: "Black",
    code: "#000000",
    id: faker.string.uuid(),
  },
  {
    title: "White",
    code: "#FFFFFF",
    id: faker.string.uuid(),
  },
  {
    title: "Red",
    code: "#FF0000",
    id: faker.string.uuid(),
  },
  {
    title: "Blue",
    code: "#0000FF",
    id: faker.string.uuid(),
  },
  {
    title: "Brown",
    code: "#8B4513",
    id: faker.string.uuid(),
  },
  {
    title: "Gray",
    code: "#808080",
    id: faker.string.uuid(),
  },
  {
    title: "Navy",
    code: "#000080",
    id: faker.string.uuid(),
  },
  {
    title: "Tan",
    code: "#D2B48C",
    id: faker.string.uuid(),
  },
];

const SIZES = [
  {
    title: "US 6",
    id: faker.string.uuid(),
  },
  {
    title: "US 7",
    id: faker.string.uuid(),
  },
  {
    title: "US 8",
    id: faker.string.uuid(),
  },
  {
    title: "US 9",
    id: faker.string.uuid(),
  },
  {
    title: "US 10",
    id: faker.string.uuid(),
  },
  {
    title: "US 11",
    id: faker.string.uuid(),
  },
  {
    title: "US 12",
    id: faker.string.uuid(),
  },
];

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: {
    id: string;
    title: string;
  };
  rating: number;
  reviewCount: number;
  stock: number;
  isNew: boolean;
  isFeatured: boolean;
  brand: {
    id: string;
    title: string;
  };
  colors: { title: string; id: string; code: string }[];
  sizes: { title: string; id: string }[];
}

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 200 }, () => ({
  id: faker.string.uuid(),
  name: faker.commerce.productName(),
  price: parseFloat(faker.commerce.price({ min: 29, max: 299 })),
  description: faker.commerce.productDescription(),
  image: faker.image.url({ width: 400, height: 300 }),
  category: faker.helpers.arrayElement(CATEGORIES),
  rating: faker.number.float({ min: 1, max: 5, fractionDigits: 1 }),
  reviewCount: faker.number.int({ min: 0, max: 1000 }),
  stock: faker.number.int({ min: 0, max: 200 }),
  isNew: faker.datatype.boolean({ probability: 0.2 }),
  isFeatured: faker.datatype.boolean({ probability: 0.2 }),
  brand: faker.helpers.arrayElement(BRANDS),
  colors: faker.helpers.arrayElements(COLORS, { min: 2, max: COLORS.length }),
  sizes: faker.helpers.arrayElements(SIZES, { min: 1, max: SIZES.length }),
}));

export const getProductsByCategoryId = (id: string) =>
  MOCK_PRODUCTS.filter(p => p.category.id === id);

export const getProductsByBrandId = (id: string) => MOCK_PRODUCTS.filter(p => p.brand.id === id);

export const getFeaturedProducts = () => MOCK_PRODUCTS.filter(p => p.isFeatured);

export const getNewProducts = () => MOCK_PRODUCTS.filter(p => p.isNew);
