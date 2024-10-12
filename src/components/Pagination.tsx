import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      if (i <= 7 || i > totalPages - 3 || (i >= currentPage - 1 && i <= currentPage + 1)) {
        pages.push(
          <button 
            key={i} 
            onClick={() => handleClick(i)} 
            disabled={i === currentPage}
            style={{ margin: '0 5px', fontWeight: i === currentPage ? 'bold' : 'normal' }}
          >
            {i}
          </button>
        );
      } else if (i === 8 && currentPage > 5) {
        pages.push(<span key={i}>...</span>);
      } else if (i === totalPages - 1 && currentPage < totalPages - 4) {
        pages.push(<span key={i}>...</span>);
      }
    }

    return pages;
  };

  return (
    <div>
      {renderPageNumbers()}
    </div>
  );
};

export default Pagination;


