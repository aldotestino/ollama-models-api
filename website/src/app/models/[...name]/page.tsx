import DisplayTags from '@/components/display-tags';
import { Badge } from '@/components/ui/badge';
import { Model } from '@/lib/types';
import { Label } from '@/components/ui/label';
import { Clock3, Download } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import env from '@/lib/env';

async function ModelPage({ params }: {params: {name: [string, string?]}}) {

  const res = await fetch(`${env.NEXT_PUBLIC_API_URL}/api/v1/models/${params.name.join('/')}`, {
    next: {
      revalidate: 3600,
      tags: ['models'],
    }
  });
  const model: Model = await res.json();

  return (
    <div className="h-full overflow-y-auto">
      <div className="container max-w-screen-lg p-10 space-y-6">
        <div className='space-y-2'>
          {model.family && <Badge>{model.family}</Badge>}
          <Link href={model.url} target='_blank' className='block hover:underline font-bold text-2xl sm:text-4xl'>{model.name}</Link>
          {model.description && <p className='text-muted-foreground max-w-prose'>{model.description}</p>}
        </div>
        <div className='flex flex-row items-center gap-4'>
          <div className='flex items-center gap-1 text-muted-foreground font-semibold'>
            <Download className='w-4 h-4' />
            <span>{model.pulls} Pulls</span>
          </div>
          <div className='flex items-center gap-1 text-muted-foreground font-semibold'>
            <Clock3 className='w-4 h-4' />
            <span>{model.lastUpdate}</span>
          </div>
        </div>
        <DisplayTags primaryTags={model.primaryTags} secondaryTags={model.secondaryTags} name={model.name} />
        {model.system && 
          <div className='space-y-2'>
            <Label>System Prompt</Label>
            <Textarea className='w-full h-96 font-mono text-muted-foreground focus-visible:ring-transparent' defaultValue={model.system} readOnly />
          </div>
        }
      </div>
    </div>
  );
}

export default ModelPage;