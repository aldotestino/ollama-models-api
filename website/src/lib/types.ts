export type BaseModel = {
  id: string;
  featPosition: number
  name: string;
  description: string;
  pulls: string;
  lastUpdate: string;
  family: string;
  system: string;
};

export type ModelsSearchResponse = {
  total: number;
  pages: number;
  nextPage: number | null;
  prevPage: number | null;
  models: BaseModel[];
};