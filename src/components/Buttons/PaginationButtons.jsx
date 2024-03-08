import React from 'react';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PaginationButtons = ({ setPage, page, totalPages }) => {
  return (
    <div>
      <Button
        onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))}
        disabled={page === 1}
      >
        <ArrowBackIcon />
        Назад
      </Button>
      <Button onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}>
        Показати більше
      </Button>
    </div>
  );
};

export default PaginationButtons;
