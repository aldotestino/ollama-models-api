'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

function BackButton() {

  const router = useRouter();

  return (
    <Button 
      onClick={() => router.back()} 
      variant='link' 
      size='sm'
      className='group p-0'
    >
      <div className="w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-100 group-hover:pr-2 group-hover:opacity-100">
        <ArrowLeft className='w-4 h-4' />
      </div>
      <span>Back to models</span>
    </Button>
  );
}

export default BackButton;