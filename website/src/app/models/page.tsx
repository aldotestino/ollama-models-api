import { createUrl } from '@/lib/utils';
import { columns } from './columns';
import { DataTable } from './data-table';
import { ModelsSearchResponse } from '@/lib/types';

async function ModelsPage({ searchParams }: {
  searchParams: {
    q: string;
    p: number;
    n: number;
  }
}) {

  const res = await fetch(createUrl(searchParams), {
    next: {
      revalidate: 3600,
      tags: ['models'],
    }
  });
  const data: ModelsSearchResponse = await res.json();
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-screen-lg p-10">
        <DataTable 
          columns={columns} 
          data={data.models} 
          total={data.total} 
          pages={data.pages} 
          nextPage={data.nextPage}
          prevPage={data.prevPage} 
          currentPage={searchParams.p}
          currentQuery={searchParams.q}
        />
      </div>
    </div>
  );
}

export default ModelsPage;