import Logo from './logo';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import { Book } from 'lucide-react';

function Header() {
  return (
    <header className='border-b py-4'>
      <div className='container max-w-screen-lg flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/' passHref legacyBehavior>
            <Logo className='w-8 h-8' />
          </Link>
          <h1 className='hidden sm:block font-semibold text-xl'>Ollama Models Api</h1>
        </div>
        <Link href="http://localhost:8080/docs" target='_blank' className={buttonVariants({ size: 'sm', variant: 'gooeyRight' })}>
          <Book className='w-4 h-4 mr-2' />
          <span>Read the docs</span>
        </Link>
      </div>
    </header>
  );
}

export default Header;