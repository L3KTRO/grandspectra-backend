import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

export type SortDirection = "asc" | "desc";

interface SortableHeaderProps<C extends string = string> {
  label: React.ReactNode;
  column: C;
  activeSort: C | string | undefined;
  direction: SortDirection | undefined;
  onSort: (column: C) => void;
  onExplicitSort?: (column: C, direction: SortDirection) => void;
  className?: string;
}

export function SortableHeader<C extends string = string>({
  label,
  column,
  activeSort,
  direction,
  onSort,
  onExplicitSort,
  className,
}: SortableHeaderProps<C>) {
  const isActive = activeSort === column;
  const upActive = isActive && direction === "asc";
  const downActive = isActive && direction === "desc";

  const handleAsc = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExplicitSort) return onExplicitSort(column, "asc");
    onSort(column);
  };

  const handleDesc = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onExplicitSort) return onExplicitSort(column, "desc");
    onSort(column);
  };

  return (
    <div className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <button
        type="button"
        className="hover:underline"
        onClick={() => onSort(column)}
        aria-label={`Ordenar por ${typeof label === "string" ? label : "columna"}`}
      >
        {label}
      </button>
      <span className="ml-1 inline-flex flex-col leading-none">
        <button
          type="button"
          onClick={handleAsc}
          title="Orden ascendente"
          className={upActive ? "text-yellow-400" : "text-muted-foreground/60 hover:text-foreground"}
          aria-pressed={upActive}
          aria-label="Orden ascendente"
        >
          <ChevronUp className="h-3 w-3" />
        </button>
        <button
          type="button"
          onClick={handleDesc}
          title="Orden descendente"
          className={downActive ? "text-yellow-400" : "text-muted-foreground/60 hover:text-foreground"}
          aria-pressed={downActive}
          aria-label="Orden descendente"
        >
          <ChevronDown className="h-3 w-3" />
        </button>
      </span>
    </div>
  );
}

