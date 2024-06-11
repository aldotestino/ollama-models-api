'use client';

import Logo from '@/components/logo';
import AnimatedShinyText from '@/components/magicui/animated-shiny-text';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import DocsLightImage from '@/assets/docs-light.png';
import DocsDarkImage from '@/assets/docs-dark.png';
import { ArrowRightIcon } from 'lucide-react';
import { BorderBeam } from '@/components/magicui/border-beam';
import DotPattern from '@/components/magicui/dot-pattern';
import DocsButton from '@/components/docs-button';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <main className="h-screen relative flex overflow-hidden">
      <div className="z-10 h-full container max-w-screen-lg flex flex-col items-center justify-center gap-4">
        <Link href="/models">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={cn(
              'group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800',
            )}
          >
            <AnimatedShinyText className="inline-flex text-sm items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
              <span>✨ Try it now!</span>
              <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
            </AnimatedShinyText>
          </motion.div>
        </Link>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} 
          className='flex flex-col md:flex-row items-center gap-2'>
          <Logo className="w-16 h-16" />
          <h1
            className='text-center text-4xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-black to-slate-600 dark:from-white dark:to-slate-600'>
              Ollama Models API
          </h1>
        </motion.div>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }} className="text-lg font-semibold text-muted-foreground max-w-prose text-center">
          <span>An easy and free to use API to get available models from</span>
          {' '}
          <Link href="https://ollama.com" target='_blank' className='underline text-primary'>Ollama</Link> 
          <span>.</span>
        </motion.p>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative rounded-xl bg-background dark:bg-[#1B1B1D]">
          <Image src={DocsLightImage} alt='Screenshot of the docs' className='dark:hidden w-[700px] rounded-[inherit] border object-contain shadow-lg p-2' />
          <Image src={DocsDarkImage} alt='Screenshot of the docs' className='hidden dark:block w-[700px] rounded-[inherit] border object-contain shadow-lg p-2' />
          <BorderBeam size={250} duration={12} delay={9} />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className='flex flex-col sm:flex-row gap-2 items-center'>
          <Link href="https://github.com/aldotestino/ollama-models-api" target='_blank' className={buttonVariants({ variant: 'outline', className: 'w-full' })}>
            Support on GitHub
          </Link>
          <DocsButton />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        transition={{ duration: 2 }}
      >
        <DotPattern
          className={cn(
            '[mask-image:radial-gradient(200px_circle_at_center,white,transparent)] sm:[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]',
          )}
        />
      </motion.div>
    </main>
  );
}
