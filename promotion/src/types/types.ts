export interface IPromotion {
  id: string;
  name: string;
  type: PromotionType;
  discount: number;
  max_discount?: number | null;
  min_order: number;
  start_date: Date;
  end_date: Date;
  max_usage: number;
}

export enum PromotionType {
  PERCENTAGE = 'percentage',
  FIXED = 'fixed',
}