'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/lib/hooks';
import { useParams, usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ModelsSearchResponse } from '@/lib/types';
import Paginator from './paginator';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  total,
  pages,
  nextPage,
  prevPage,
  columns,
  data,
}: DataTableProps<TData, TValue> & Pick<ModelsSearchResponse, 'total' | 'pages' | 'nextPage' | 'prevPage'>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [query, setQuery] = useState('');
  
  // const debouncedQuery = useDebounce(query, 500);
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // useEffect(() => {
  //   const prevQuery = searchParams.get('q');
  //   if (debouncedQuery !== prevQuery) {
  //     const newSearchParams = new URLSearchParams();
  //     newSearchParams.set('q', debouncedQuery);
  //     router.push(`/models?${newSearchParams.toString()}`);
  //   }
  // }, [debouncedQuery, router, searchParams]);

  return (
    <div className='space-y-4'>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className='flex items-center relative w-full sm:max-w-72'>
          <Search className="absolute left-2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Filter by name..."
            className="pl-8"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <p className='text-left w-full font-semibold text-muted-foreground'>{total} models found.</p>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex justify-end'>
        <Paginator pages={pages} nextPage={nextPage} prevPage={prevPage} />
      </div>
    </div>
  );
}
