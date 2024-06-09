import Header from '@/components/header';
import React from 'react';

function ModelsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='h-screen grid grid-rows-[auto,1fr] overflow-y-hidden'>
      <Header />
      {children}
    </div>
  );
}

export default ModelsLayout;