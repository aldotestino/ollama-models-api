import { createUrl } from '@/lib/utils';
import { columns } from './columns';
import { DataTable } from './data-table';

async function ModelsPage({ searchParams }: {
  searchParams: {
    q: string;
    p: number;
    n: number;
  }
}) {

  const res = await fetch(createUrl(searchParams));
  const data = await res.json();
  
  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-screen-lg p-10">
        <DataTable columns={columns} data={data.models} />
      </div>
    </div>
  );
}

export default ModelsPage;