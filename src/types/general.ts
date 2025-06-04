export type StateStatus = {
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
};

export type DashboardFilter = {
  oneMonth: boolean | undefined;
  threeMonth: boolean | undefined;
  sixMonth: boolean | undefined;
};

export type Paginator = {
  totalItem: number;
  limit: number;
  pageCount: number;
  page: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
  prev: number;
  next: number;
};

export class PaginationParams {
  page: string | 1 = 1;
  limit?: string | undefined;
  keyword?: string | "";
  slug?: string | undefined;
  sorttype?: string | undefined;
  sortby?: string | undefined;
}

export class ParamsFilterService extends PaginationParams {
  category?: string;
  subCategory?: string;
  lowestPrice?: number;
  highestPrice?: number;
  rating?: number;
  type?: "male" | "female" | "unisex";
}
