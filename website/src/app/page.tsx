import Logo from '@/components/logo';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import DocsImage from '@/assets/docs.png';
import { ArrowRightIcon } from 'lucide-react';

export default function Home() {
  return (
    <main className="h-screen">
      <div className="h-full container max-w-screen-lg flex flex-col items-center justify-center gap-4">
        <div
          className={cn(
            'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
          )}
        >
          <AnimatedShinyText className="inline-flex text-sm items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
            <span>✨ Try it now!</span>
            <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
          </AnimatedShinyText>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-2'>
          <Logo className="w-16 h-16" />
          <h1 className='text-center text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-black to-slate-600'>Ollama Models API</h1>
        </div>
        <p className="text-lg font-semibold text-muted-foreground max-w-prose text-center">
          <span>An easy and free to use API to get available models from</span>
          {' '}
          <Link href="https://ollama.com" target='_blank' className='underline text-primary'>Ollama</Link> 
          <span>.</span>
        </p>
        <div className='flex flex-col sm:flex-row gap-2 items-center'>
          <Link href="https://github.com/aldotestino/ollama-models-api" target='_blank' className={buttonVariants({ variant: 'outline' })}>
            Support on GitHub
          </Link>
          <Link href="http://localhost:8080/docs" target='_blank' className={buttonVariants({ variant: 'gooeyRight' })}>
            Read the docs
          </Link>
        </div>
      </div>
      {/* <div className='fixed -bottom-20 w-[600px] h-auto right-[50%] translate-x-[50%]'>
        <Image src={DocsImage} alt='Screenshot of the docs' />
      </div> */}
    </main>
  );
}
