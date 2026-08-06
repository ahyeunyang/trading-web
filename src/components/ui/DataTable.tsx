import type { ReactNode } from "react";
import "./DataTable.scss";

type DataTableProps = {
  children: ReactNode;
  className?: string;
};

export function DataTable({ children, className = "" }: DataTableProps) {
  return (
    <div className={`data-table${className ? ` ${className}` : ""}`}>
      {children}
    </div>
  );
}

type DataTableSectionProps = {
  children: ReactNode;
  className?: string;
};

export function DataTableHead({ children, className = "" }: DataTableSectionProps) {
  return <div className={`data-table__head${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function DataTableBody({ children, className = "" }: DataTableSectionProps) {
  return <div className={`data-table__body${className ? ` ${className}` : ""}`}>{children}</div>;
}

export function DataTableFooter({ children, className = "" }: DataTableSectionProps) {
  return <div className={`data-table__footer${className ? ` ${className}` : ""}`}>{children}</div>;
}

type DataTablePaginationProps = {
  summary: ReactNode;
  page: number;
  pageCount: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
  previousLabel: string;
  nextLabel: string;
  pageSizeLabel: string;
  viewLabel: ReactNode;
  pageSizeOptions?: number[];
  className?: string;
};

function paginationItems(page: number, pageCount: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index + 1);
  if (page <= 3) return [1, 2, 3, "end-gap", pageCount - 2, pageCount - 1, pageCount] as const;
  if (page >= pageCount - 2) return [1, 2, 3, "start-gap", pageCount - 2, pageCount - 1, pageCount] as const;
  return [1, "start-gap", page - 1, page, page + 1, "end-gap", pageCount] as const;
}

function PaginationChevron({ next = false }: { next?: boolean }) {
  return (
    <svg className={next ? "is-next" : undefined} viewBox="0 0 11 19" fill="none" aria-hidden="true">
      <path d="M9.5 2 2.707 8.793a1 1 0 0 0 0 1.414L9.5 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function DataTablePagination({
  summary,
  page,
  pageCount,
  pageSize,
  onPageChange,
  onPageSizeChange,
  previousLabel,
  nextLabel,
  pageSizeLabel,
  viewLabel,
  pageSizeOptions = [10, 20, 50],
  className = "",
}: DataTablePaginationProps) {
  const safePageCount = Math.max(1, pageCount);
  const safePage = Math.min(safePageCount, Math.max(1, page));

  return (
    <DataTableFooter className={`data-table-pagination${className ? ` ${className}` : ""}`}>
      <div className="data-table-pagination__summary">{summary}</div>
      <nav className="data-table-pagination__pages" aria-label="Pagination">
        <button
          className="data-table-pagination__arrow"
          type="button"
          disabled={safePage === 1}
          onClick={() => onPageChange(Math.max(1, safePage - 1))}
          aria-label={previousLabel}
        >
          <PaginationChevron />
        </button>
        {paginationItems(safePage, safePageCount).map((item) => typeof item === "number" ? (
          <button
            type="button"
            key={item}
            className={safePage === item ? "is-active" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ) : <span className="data-table-pagination__ellipsis" key={item}>…</span>)}
        <button
          className="data-table-pagination__arrow"
          type="button"
          disabled={safePage === safePageCount}
          onClick={() => onPageChange(Math.min(safePageCount, safePage + 1))}
          aria-label={nextLabel}
        >
          <PaginationChevron next />
        </button>
      </nav>
      <label className="data-table-pagination__size">
        <select
          value={pageSize}
          aria-label={pageSizeLabel}
          onChange={(event) => onPageSizeChange(Number(event.target.value))}
        >
          {pageSizeOptions.map((option) => <option value={option} key={option}>{option}</option>)}
        </select>
        <span>{viewLabel}</span>
      </label>
    </DataTableFooter>
  );
}

type TableSearchProps = {
  id: string;
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  className?: string;
};

export function TableSearch({
  id,
  value,
  placeholder,
  onChange,
  className = "",
}: TableSearchProps) {
  return (
    <label className={`table-search${className ? ` ${className}` : ""}`} htmlFor={id}>
      <svg viewBox="0 0 12 15" fill="none" aria-hidden="true">
        <path
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.5 6.5C10.5 8.98528 8.48528 11 6 11C3.51472 11 1.5 8.98528 1.5 6.5C1.5 4.01472 3.51472 2 6 2C8.48528 2 10.5 4.01472 10.5 6.5ZM12 6.5C12 9.81371 9.31371 12.5 6 12.5C5.0458 12.5 4.14363 12.2773 3.34264 11.8809L2.04742 14.0142C1.83245 14.3683 1.37116 14.4811 1.0171 14.2661C0.663032 14.0511 0.550271 13.5898 0.765239 13.2358L2.09105 11.0521C0.810824 9.95171 0 8.32054 0 6.5C0 3.18629 2.68629 0.5 6 0.5C9.31371 0.5 12 3.18629 12 6.5Z"
        />
      </svg>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}
