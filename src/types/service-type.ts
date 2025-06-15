export type ServiceResponseItem = {
  _id: string;
  estimation: number;
  name: string;
  description: string;
  categoryIds: string[];
  price: number;
  ratingCount: number;
  ratingAverage: number;
  type: string;
  assetRef: string;
};

export type CategoryItem = {
  _id: string;
  name: string;
  slug: string;
  parentId: string;
  parentName: string;
  parentSlug: string;
  parentCode: number;
  code: string;
};

export type CategoryResponse = {
  parent: CategoryItem;
  children: CategoryItem[] | [] | null;
};

export type ServiceForm = {
  type: string;
  name: string;
  category: string;
  price: number;
  description: string;
  estimation: number;
  file?: File | undefined;
  subCategory?: string | null;
};

export type ServiceDetailResponseItem = {
  _id: string;
  estimation: number;
  name: string;
  description: string;
  category: CategoryItem[];
  price: number;
  ratingCount: number;
  ratingAverage: number;
  type: string;
  assetRef: string;
};

export type SelectServiceItem = {
  _id: string;
  name: string;
};
