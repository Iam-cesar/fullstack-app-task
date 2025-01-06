export interface APIResponse<T> {
  meta: {
    page: number;
    take: number;
    items_count: number;
    page_count: number;
    has_previous_page: boolean;
    has_next_page: boolean;
  };
  data: T[];
}
