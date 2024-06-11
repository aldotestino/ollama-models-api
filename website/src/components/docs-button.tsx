import { Book } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { ButtonProps, buttonVariants } from './ui/button';
import env from '@/lib/env';
import { cn } from '@/lib/utils';

function DocsButton(props: ButtonProps) {
  return (
    <Link href={`${env.NEXT_PUBLIC_API_URL}/docs`} target='_blank' className={buttonVariants({ variant: 'gooeyRight', className: cn('w-full', props.className), size: props.size })}>
      <Book className='w-4 h-4 mr-2' />
      <span>Read the docs</span>
    </Link>
  );
}

export default DocsButton;