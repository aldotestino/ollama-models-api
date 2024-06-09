'use client';

import { BaseModel } from '@/lib/types';
import { ColumnDef } from '@tanstack/react-table';
import { Boxes, Clock3, Download } from 'lucide-react';
import Link from 'next/link';

export const columns: ColumnDef<BaseModel>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <Link href={`/models/${row.original.name}`} className='underline'>{row.original.name}</Link>
  },
  {
    accessorKey: 'family',
    header: () => <div className='flex items-center gap-1'>
      <Boxes className='w-4 h-4' />
      <span>Family</span>
    </div>
  },
  {
    accessorKey: 'pulls',
    header: () => <div className='flex items-center gap-1'>
      <Download className='w-4 h-4' />
      <span>Pulls</span>
    </div>
  },
  {
    accessorKey: 'lastUpdate',
    header: () => <div className='flex items-center gap-1'>
      <Clock3 className='w-4 h-4' />
      <span>Last Update</span>
    </div>
  },
];

