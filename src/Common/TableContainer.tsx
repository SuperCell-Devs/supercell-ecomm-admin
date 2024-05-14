import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Column,
  Table as ReactTable,
  ColumnFiltersState,
  FilterFn,
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  PaginationState
} from '@tanstack/react-table';

import { rankItem } from '@tanstack/match-sorter-utils';
import { ChevronLeft, ChevronRight } from "lucide-react";

// Column Filter
const Filter = ({
  column
}: {
  column: Column<any, unknown>;
  table: ReactTable<any>;
}) => {
  const columnFilterValue = column.getFilterValue();

  return (
    <>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder="Search..."
        className="w-36 border shadow rounded"
        list={column.id + 'list'}
      />
      <div className="h-1" />
    </>
  );
};

// Global Filter
const DebouncedInput = ({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [debounce, onChange, value]);

  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  );
};
interface TableContainerProps {
  columns?: any;
  data?: any;
  tableclassName?: any;
  divclassName?: any;
  thclassName?: any;
  trclassName?: any;
  tableClass?: any;
  tdclassName?: any;
  theadclassName?: any;
  tbodyclassName?: any;
  isTfoot?: boolean;
  isSelect?: boolean;
  isBordered?: boolean;
  customPageSize?: number;
  isGlobalFilter?: boolean;
  isPagination: boolean;
  PaginationClassName?: string;
  SearchPlaceholder?: string;
  pageIndex?: number;
  pageSize?: number;
  setPagination?: React.Dispatch<React.SetStateAction<PaginationState>>
}

const TableContainer = ({
  columns,
  data,
  tableclassName,
  theadclassName,
  divclassName,
  trclassName,
  thclassName,
  tdclassName,
  tbodyclassName,
  isTfoot,
  isSelect,
  isPagination,
  customPageSize,
  isGlobalFilter,
  PaginationClassName,
  SearchPlaceholder,
  pageIndex,
  pageSize,
  setPagination
}: TableContainerProps) => {

  // const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // const [globalFilter, setGlobalFilter] = useState('');

  // const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  //   const itemRank = rankItem(row.getValue(columnId), value);
  //   addMeta({
  //     itemRank
  //   });
  //   return itemRank.passed;
  // };

  
  const table = useReactTable({
    data,
    columns,
    // pageCount: dataQuery.data?.pageCount ?? -1, //you can now pass in `rowCount` instead of pageCount and `pageCount` will be calculated internally (new in v8.13.0)
    // rowCount: dataQuery.data?.rowCount, // new in v8.13.0 - alternatively, just pass in `pageCount` directly
    state: {
      pagination: { 
        pageIndex: pageIndex || 1,
        pageSize: pageSize || 1
      },
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, //we're doing manual "server-side" pagination
    // getPaginationRowModel: getPaginationRowModel(), // If only doing manual pagination, you don't need this
    debugTable: true,
  })
  console.log(data);
  
  return (
    <Fragment>

      {/* <div className="grid grid-cols-12 lg:grid-cols-12 gap-3"> */}
        {/* {
          isSelect &&
          <div className="self-center col-span-12 lg:col-span-6">
            <label>Show
              <select name="basic_tables_length" aria-controls="basic_tables"
                className="px-3 py-2 form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 disabled:bg-slate-100 dark:disabled:bg-zink-600 disabled:border-slate-300 dark:disabled:border-zink-500 dark:disabled:text-zink-200 disabled:text-slate-500 dark:text-zink-100 dark:bg-zink-700 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200 inline-block w-auto"
                onClick={(event: any) => table.setPageSize(event.target.value)}>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </label>
          </div>
        } */}

        {/* <div className="self-center col-span-12 lg:col-span-6 lg:place-self-end">
          {isGlobalFilter &&
            <label>Search: <DebouncedInput
              value={globalFilter ?? ''}
              onChange={value => setGlobalFilter(String(value))}
              className="py-2 pr-4 text-sm text-topbar-item bg-topbar border border-topbar-border rounded pl-2 placeholder:text-slate-400 form-control focus-visible:outline-0 min-w-[200px] focus:border-blue-400 group-data-[topbar=dark]:bg-topbar-dark group-data-[topbar=dark]:border-topbar-border-dark group-data-[topbar=dark]:placeholder:text-slate-500 group-data-[topbar=dark]:text-topbar-item-dark group-data-[topbar=brand]:bg-topbar-brand group-data-[topbar=brand]:border-topbar-border-brand group-data-[topbar=brand]:placeholder:text-blue-300 group-data-[topbar=brand]:text-topbar-item-brand group-data-[topbar=dark]:dark:bg-zink-700 group-data-[topbar=dark]:dark:border-zink-500 group-data-[topbar=dark]:dark:text-zink-100"
              placeholder={SearchPlaceholder}
            />
            </label>
          }
        </div> */}
      {/* </div> */}

      <div className={divclassName}>
        <table className={tableclassName}>
          <thead className={theadclassName}>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id} className={trclassName}>
                {headerGroup.headers.map(header => {
                  return (
                    <th key={header.id} colSpan={header.colSpan}
                      {...{
                        className: `${header.column.getCanSort()} ${thclassName}`,
                        onClick: header.column.getToggleSortingHandler(),
                      }}>
                      {header.isPlaceholder ? null : (
                        <React.Fragment>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: ' ',
                            desc: ' ',
                          }
                          // eslint-disable-next-line no-unexpected-multiline
                          [header.column.getIsSorted() as string] ?? null}
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </React.Fragment>
                      )}
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>

          <tbody className={tbodyclassName}>
            {table.getRowModel().rows.map(row => {
              return (
                <tr key={row.id} className={trclassName}>
                  {row.getVisibleCells().map(cell => {
                    return (
                      <td key={cell.id} className={tdclassName}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>

          {/* {isTfoot && <tfoot>
            {
              table.getFooterGroups()?.map((footer: any, tfKey: number) => (
                <tr key={tfKey}>
                  {
                    footer.headers?.map((tf: any, key: number) => (
                      <th key={key} className="p-3 text-left group-[.bordered]:border group-[.bordered]:border-slate-200 group-[.bordered]:dark:border-zink-500">
                        {flexRender(
                          tf.column.columnDef.header,
                          tf.getContext()
                        )}
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </tfoot>} */}
        </table>
      </div>

      {
        isPagination && (

          <div className="flex justify-center items-center gap-2 mt-4">
            <span className="flex items-center gap-1">
              Go to page:
              <input
                type="number"
                defaultValue={table.getState().pagination.pageIndex + 1}
                onChange={e => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0
                  table.setPageIndex(page)
                }}
                className="border p-1 rounded w-16"
              />
            </span>
          </div>)
      }
    </Fragment>
  );
};

export default TableContainer;