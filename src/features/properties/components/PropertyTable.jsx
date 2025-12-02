import React, { useState } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getPaginationRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function PropertyTable({ data, columns, onRowClick }) {
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="rounded-lg border border-slate-300 bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-slate-100 border-b border-slate-300">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="h-10 px-4 text-xs font-semibold text-slate-700 uppercase tracking-wider whitespace-nowrap select-none"
                                        style={{ width: header.getSize() }}
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className={cn(
                                        "group transition-colors hover:bg-slate-50 cursor-pointer",
                                        row.getIsSelected() && "bg-indigo-50/50"
                                    )}
                                    onClick={() => onRowClick && onRowClick(row.original)}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            key={cell.id}
                                            className="px-4 py-3 align-middle text-slate-700 font-medium"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center text-slate-500"
                                >
                                    No results found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-slate-300 bg-slate-50/50">
                <div className="text-xs text-slate-500">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className="h-8 w-8 p-0"
                    >
                        {"<"}
                    </Button>
                    <div className="text-xs font-medium text-slate-700">
                        Page {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className="h-8 w-8 p-0"
                    >
                        {">"}
                    </Button>
                </div>
            </div>
        </div>
    );
}

// Default Columns Definition
export const defaultPropertyColumns = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) => table.toggleAllRowsSelected(!!value)}
                aria-label="Select all"
                className="translate-y-[2px]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                onClick={(e) => e.stopPropagation()}
                className="translate-y-[2px]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
        size: 40,
    },
    {
        accessorKey: "name",
        header: "Property",
        cell: ({ row }) => {
            const image = row.original.image;
            return (
                <div className="flex items-center gap-3">
                    {image ? (
                        <img
                            src={image}
                            alt=""
                            className="h-10 w-10 rounded-md object-cover border border-slate-200"
                        />
                    ) : (
                        <div className="h-10 w-10 rounded-md bg-slate-100 flex items-center justify-center text-slate-400">
                            <span className="text-xs font-bold">N/A</span>
                        </div>
                    )}
                    <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{row.getValue("name")}</span>
                        <span className="text-xs text-slate-500">{row.original.address}</span>
                    </div>
                </div>
            );
        },
        size: 300,
    },
    {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => (
            <span className="capitalize text-slate-600">{row.getValue("type")}</span>
        ),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status");
            let variant = "secondary";
            let className = "bg-slate-100 text-slate-600";

            if (status === "Active" || status === "Leased") {
                className = "bg-emerald-50 text-emerald-700 border-emerald-100";
            } else if (status === "Vacant") {
                className = "bg-amber-50 text-amber-700 border-amber-100";
            } else if (status === "Maintenance") {
                className = "bg-red-50 text-red-700 border-red-100";
            }

            return (
                <Badge variant="outline" className={cn("font-normal", className)}>
                    {status}
                </Badge>
            );
        },
    },
    {
        accessorKey: "units",
        header: "Units",
        cell: ({ row }) => (
            <div className="text-slate-600">
                <span className="font-medium text-slate-900">{row.getValue("units")}</span>
                <span className="text-xs text-slate-400 ml-1">Total</span>
            </div>
        ),
    },
    {
        accessorKey: "occupancy",
        header: "Occupancy",
        cell: ({ row }) => {
            const val = row.getValue("occupancy");
            return (
                <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 bg-slate-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 rounded-full"
                            style={{ width: `${val}%` }}
                        />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{val}%</span>
                </div>
            );
        },
    },
    {
        accessorKey: "rent",
        header: "Monthly Rent",
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("rent"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
            return <span className="font-medium text-slate-900">{formatted}</span>;
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return (
                <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                            <DropdownMenuItem className="gap-2">
                                <Eye className="h-4 w-4 text-slate-500" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                                <Edit className="h-4 w-4 text-slate-500" /> Edit Property
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="gap-2 text-red-600 focus:text-red-600 focus:bg-red-50">
                                <Trash2 className="h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            );
        },
        size: 50,
    },
];
