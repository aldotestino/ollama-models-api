'use client';

import {
  SelectItemWithSideText,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Model } from '@/lib/types';
import { Check, Copy, Tag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from './ui/button';
import { useMemo, useState } from 'react';
import React from 'react';

function DisplayTags({
  name,
  primaryTags,
  secondaryTags
}: Pick<Model, 'name' | 'primaryTags' | 'secondaryTags'>) {

  const [tag, setTag] = useState(primaryTags[0]?.name || secondaryTags[0]?.name || '');
  const [copied, setCopied] = useState(false);

  const command = useMemo(() => `ollama run ${name}:${tag}`, [name, tag]);

  async function onCopy() {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    const timeout = setTimeout(() => setCopied(false), 3000);

    return () => clearTimeout(timeout);
  }

  return (
    <div className='flex flex-col gap-2 sm:flex-row sm:gap-4 items-center justify-between'>
      <div className='flex w-full sm:w-fit items-center gap-4'>
        <Select defaultValue={primaryTags[0]?.name} value={tag} onValueChange={setTag}>
          <SelectTrigger className="flex-1 sm:flex-none sm:w-[220px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {primaryTags.length > 0 && 
              <SelectGroup>
                <SelectLabel>Primary Tags</SelectLabel>
                {primaryTags.map(t => (
                  <SelectItemWithSideText key={t.name} value={t.name} sideText={t.size}>{t.name}</SelectItemWithSideText>
                ))}
              </SelectGroup>
            }
            {secondaryTags.length > 0 && 
              <SelectGroup>
                <SelectLabel>Secondary Tags</SelectLabel>
                {secondaryTags.map(t => (
                  <SelectItemWithSideText key={t.name} value={t.name} sideText={t.size}>{t.name}</SelectItemWithSideText>
                ))}
              </SelectGroup>
            }
          </SelectContent>
        </Select>
        <div className='flex items-center gap-1 text-muted-foreground font-semibold'>
          <Tag className='w-4 h-4' />
          <span>{primaryTags.length + secondaryTags.length} Tags</span>
        </div>
      </div>
      <div className='flex w-full sm:flex-1 sm:max-w-[340px]'>
        <Input readOnly className='rounded-r-none border-r-0 font-mono text-muted-foreground focus-visible:ring-transparent' value={command} />
        <Button size="icon" className='rounded-l-none' variant="outline" onClick={onCopy}>
          {!copied ? <Copy className='w-4 h-4' /> : <Check className="w-4 h-4" />}
        </Button>
      </div>
    </div>
  );
}

export default DisplayTags;