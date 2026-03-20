import Icon from './Icon'
import './Pagination.css'

export interface PaginationProps {
  currentPage: number
  totalPages: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  pageSizeOptions?: number[]
}

export default function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 25, 50, 100],
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = []

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Show first page
      pages.push(1)

      if (currentPage > 3) {
        pages.push('...')
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1)
      const end = Math.min(totalPages - 1, currentPage + 1)

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (currentPage < totalPages - 2) {
        pages.push('...')
      }

      // Show last page
      pages.push(totalPages)
    }

    return pages
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleFirst = () => {
    onPageChange(1)
  }

  const handleLast = () => {
    onPageChange(totalPages)
  }

  const pages = getPageNumbers()

  return (
    <div className="pagination">
      <div className="pagination__info">
        Page {currentPage} of {totalPages}
      </div>

      <div className="pagination__controls">
        <div className="pagination__nav">
          {/* Navigation buttons */}
          <div className="pagination__actions">
            <button
              className="pagination__nav-btn"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Icon name="chevron-left" size={24} />
            </button>
            <button
              className="pagination__nav-btn"
              onClick={handleFirst}
              disabled={currentPage === 1}
              aria-label="First page"
            >
              <Icon name="arrow-left" size={24} />
            </button>
          </div>

          {/* Page numbers */}
          <div className="pagination__pages">
            {pages.map((page, index) => {
              if (page === '...') {
                return (
                  <span key={`ellipsis-${index}`} className="pagination__ellipsis">
                    ...
                  </span>
                )
              }

              return (
                <button
                  key={page}
                  className={`pagination__page-btn ${page === currentPage ? 'pagination__page-btn--active' : ''}`}
                  onClick={() => onPageChange(page as number)}
                  aria-label={`Page ${page}`}
                  aria-current={page === currentPage ? 'page' : undefined}
                >
                  {page}
                </button>
              )
            })}
          </div>

          {/* Navigation buttons */}
          <div className="pagination__actions">
            <button
              className="pagination__nav-btn"
              onClick={handleLast}
              disabled={currentPage === totalPages}
              aria-label="Last page"
            >
              <Icon name="arrow-right" size={24} />
            </button>
            <button
              className="pagination__nav-btn"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Icon name="chevron-right" size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="pagination__page-size">
        <span className="pagination__page-size-label">View:</span>
        <select
          className="pagination__page-size-select"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          aria-label="Rows per page"
        >
          {pageSizeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" size={24} />
      </div>
    </div>
  )
}
