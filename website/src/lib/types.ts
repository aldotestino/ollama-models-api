export type BaseModel = {
  id: string;
  featPosition: number
  name: string;
  url: string;
  description: string;
  pulls: string;
  lastUpdate: string;
  family: string;
  system: string;
};

export type Tag = {
  name: string;
  size: string;
}

export type Model = BaseModel & {
  primaryTags: Tag[]
  secondaryTags: Tag[]
}

export type ModelsSearchResponse = {
  total: number;
  pages: number;
  nextPage: number | null;
  prevPage: number | null;
  models: BaseModel[];
};