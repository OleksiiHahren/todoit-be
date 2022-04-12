export interface RegularRepositoryInterface<T> {
  getById(id: number): Promise<T>;
  getMany(paginationReq: PaginationRequest): Promise<T[]>;
}

export interface PaginationRequest {
  skip: number;
  take: number;
}
