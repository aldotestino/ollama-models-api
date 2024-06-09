'use client';

import { ColumnDef } from '@tanstack/react-table';

type BaseModel = {
  id: string;
  featPosition: number
  name: string;
  description: string;
  pulls: string;
  lastUpdate: string;
  family: string;
  system: string;
}

export const columns: ColumnDef<BaseModel>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'family',
    header: 'Family',
  },
  {
    accessorKey: 'pulls',
    header: 'Pulls',
  },
  {
    accessorKey: 'lastUpdate',
    header: 'Last Update',
  },
];

