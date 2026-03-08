"use client";

import { Button } from "@/components/ui/Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  return (
    <div className="mt-8 flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "primary" : "ghost"}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button variant="ghost" onClick={() => onPageChange(currentPage + 1)}>
          →
        </Button>
      )}
    </div>
  );
}
