"use client";

import { Button } from "@/components/ui/Button";

interface CategoryFilterProps {
  categories: string[];
  active: string;
  onChange: (category: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Button
          key={cat}
          variant={cat === active ? "primary" : "ghost"}
          onClick={() => onChange(cat)}
        >
          {cat}
        </Button>
      ))}
    </div>
  );
}
