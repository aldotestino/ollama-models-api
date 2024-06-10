import { Model } from '@/lib/types';

async function ModelPage({ params }: {params: {name: [string, string?]}}) {

  console.log(params.name, params.name.join('/'));

  const res = await fetch(`http://localhost:8080/api/v1/models/${params.name.join('/')}`);
  const model: Model = await res.json();

  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-screen-lg p-10">
        <h1>{model.name}</h1>
      </div>
    </div>
  );
}

export default ModelPage;