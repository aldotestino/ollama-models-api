import { ModelsSearchResponse } from '@/lib/types';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { cn } from '@/lib/utils';

function Paginator({
  pages,
  currentPage,
  prevPage,
  nextPage,
  currentQuery
}: Pick<ModelsSearchResponse, 'pages' | 'nextPage' | 'prevPage'> & {
  currentPage: number
  currentQuery: string
}) {

  const currentPageLink = currentQuery ? `/models?q=${currentQuery}&p=${currentPage}` : `/models?p=${currentPage}`;
  const firstPageLink = currentQuery ? `/models?q=${currentQuery}&p=1` : '/models?p=1';
  const lastPageLink = currentQuery ? `/models?q=${currentQuery}&p=${pages}` : `/models?p=${pages}`;
  const prevPageLink = currentQuery ? `/models?q=${currentQuery}&p=${prevPage}` : `/models?p=${prevPage}`;
  const nextPageLink = currentQuery ? `/models?q=${currentQuery}&p=${nextPage}` : `/models?p=${nextPage}`;

  return (
    <Pagination className='w-fit mx-0'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={prevPageLink} className={cn(!prevPage && 'pointer-events-none opacity-50')} />
        </PaginationItem>
        {prevPage && 
          <PaginationItem className='hidden sm:block'>
            <PaginationLink href={firstPageLink}>1</PaginationLink>
          </PaginationItem>
        }
        {prevPage && (prevPage !== 1) && 
          <PaginationItem className='hidden sm:block'>
            <PaginationEllipsis />
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink href={currentPageLink} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {nextPage && (nextPage !== pages) &&
          <PaginationItem className='hidden sm:block'>
            <PaginationEllipsis />
          </PaginationItem>
        }
        {nextPage && 
          <PaginationItem className='hidden sm:block'>
            <PaginationLink href={lastPageLink}>{pages}</PaginationLink>
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationNext href={nextPageLink} className={cn(!nextPage && 'pointer-events-none opacity-50')} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;