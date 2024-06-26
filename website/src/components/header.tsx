import Logo from './logo';
import Link from 'next/link';
import DocsButton from './docs-button';
import { ThemeToggle } from './theme-toggle';

function Header() {
  return (
    <header className='border-b py-4'>
      <div className='container max-w-screen-lg flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <Link href='/'>
            <Logo className='w-8 h-8' />
          </Link>
          <h1 className='hidden sm:block font-semibold text-xl'>Ollama Models Api</h1>
        </div>
        <div className='flex items-center gap-2'>
          <DocsButton className='w-fit' size="sm" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

export default Header;