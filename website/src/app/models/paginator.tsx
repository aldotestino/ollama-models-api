import { ModelsSearchResponse } from '@/lib/types';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';

function Paginator({
  pages,
  prevPage,
  nextPage,
}: Pick<ModelsSearchResponse, 'pages' | 'nextPage' | 'prevPage'>) {

  const currentPage = nextPage ? nextPage - 1 : prevPage ? prevPage + 1 : 1;

  return (
    <Pagination className='w-fit mx-0'>
      <PaginationContent>
        {prevPage && 
          <PaginationItem>
            <PaginationPrevious href={`/models?p=${prevPage}`} />
          </PaginationItem>
        }
        {prevPage && 
          <PaginationItem>
            <PaginationLink href="/models?p=1">1</PaginationLink>
          </PaginationItem>
        }
        {prevPage && (prevPage - 1 !== 1 && prevPage !== 1) && 
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        }
        {prevPage && prevPage !== 1 &&
          <PaginationItem>
            <PaginationLink href={`/models?p=${prevPage}`}>
              {prevPage}
            </PaginationLink>
          </PaginationItem>
        }
        <PaginationItem>
          <PaginationLink href={`/models?p=${currentPage}`} isActive>
            {currentPage}
          </PaginationLink>
        </PaginationItem>
        {nextPage && nextPage !== pages &&
          <PaginationItem>
            <PaginationLink href={`/models?p=${nextPage}`}>
              {nextPage}
            </PaginationLink>
          </PaginationItem>
        }
        {nextPage && (nextPage + 1 !== pages && nextPage !== pages) &&
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        }
        {nextPage && 
          <PaginationItem>
            <PaginationLink href={`/models?p=${pages}`}>{pages}</PaginationLink>
          </PaginationItem>
        }
        {nextPage && 
          <PaginationItem>
            <PaginationNext href={`/models?p=${nextPage}`} />
          </PaginationItem>
        }
      </PaginationContent>
    </Pagination>
  );
}

export default Paginator;