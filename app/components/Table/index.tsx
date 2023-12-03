import React from "react";
import {Marker} from "react-mark.js";
import {
    useFlexLayout,
    useMountedLayoutEffect,
    usePagination,
    useResizeColumns,
    useRowSelect,
    useSortBy,
    useTable
} from "react-table";
import {Box, chakra, Table as Tabl, Tbody, Td, Th, Thead, Tr, useColorModeValue} from "@chakra-ui/react";
import {ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon} from "@chakra-ui/icons";
import {useRouter} from "next/router";
import TableSkeleton from "@Components/Skeleton/TableSkeleton";

function Table({
    data,
    columns,
    setPage,
    setSize,
    currentPage,
    pageSize,
    totalPage,
    loading,
    itemPage,
    isCheckable = false,
    isDeleting = false,
    filter = '',
    fieldID = '',
}) {

    const [selected, setSelected] = React.useState(null)

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 100,
            width: 250,
            maxWidth: 400,
        }),
        []
    )

    if (isCheckable) {

        const IndeterminateCheckbox = React.forwardRef(
            ({ indeterminate, ...rest }: { indeterminate: any }, ref) => {
                const defaultRef = React.useRef() as any
                const resolvedRef = ref || defaultRef

                React.useEffect(() => {
                    resolvedRef.current.indeterminate = indeterminate
                }, [resolvedRef, indeterminate])

                return (
                    <>
                        <label className="container-check">
                            <input
                                type="checkbox"
                                ref={resolvedRef}
                                {...rest} />
                            <span className="checkmark" aria-hidden="true"></span>
                        </label>
                    </>
                )
            }
        )

        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,
            // canPreviousPage,
            // canNextPage,
            pageOptions,
            // pageCount,
            // gotoPage,
            // nextPage,
            // previousPage,
            // setPageSize,
            // Get the state from the instance
            selectedFlatRows,
            state: { pageIndex, size, selectedRowIds },
        } = useTable(
            {
                columns,
                data,
                defaultColumn,
                useControlledState: (state) => {
                    return React.useMemo(
                        () => ({
                            ...state,
                            pageIndex: currentPage,
                        }),
                        [state, currentPage]
                    );
                },
                initialState: { pageIndex: currentPage },
                manualPagination: true,
                autoResetPage: false,
                pageCount: totalPage,
                getRowID: React.useCallback(data => data.dataSid, []),
            },
            useSortBy,
            usePagination,
            useFlexLayout,
            useResizeColumns,
            useRowSelect,
            hooks => {
                hooks.visibleColumns.push(columns => [
                    // Let's make a column for selection
                    {
                        id: 'selection',
                        // disableResizing: true,
                        disableSortBy: true,
                        minWidth: 60,
                        width: 60,
                        maxWidth: 60,
                        // The header can use the table's getToggleAllRowsSelectedProps method
                        // to render a checkbox
                        Header: ({ getToggleAllPageRowsSelectedProps }) => (
                            <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                        ),
                        // The cell can use the individual row's getToggleRowSelectedProps method
                        // to the render a checkbox
                        Cell: ({ row }) => (
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        ),
                    },
                    ...columns,
                ])
            }
        );

        const router = useRouter()
        const onRowClick = (rowItem, selectedRow, id) => e => {
            if (itemPage !== '' && id !== 'selection' && !isDeleting) {
                setSelected(rowItem.original[`${fieldID}`]);
                router.push(`${itemPage}/${rowItem.original[`${fieldID}`]}`);
            }
        };

        useMountedLayoutEffect(() => {
            const selectedIds = Object.keys(selectedRowIds);
            var selectedRowsData = selectedIds
                .map(x => data[x])
                .filter(function (x) {
                    return x != null;
                });
            var selectedRowsDraftData = selectedIds
                .map(x => data[x])
                .filter(function (x) {
                    // return x != null && x.recordStatusValue.refValueInt1 === 0;
                    return x != null
                });
            var selectedRowsCheckedData = selectedIds
                .map(x => data[x])
                .filter(function (x) {
                    // return x != null && x.recordStatusValue.refValueInt1 === 1;
                    return x != null
                });
        }, [selected, selectedRowIds]);

        return (
            <>
                <Tabl cursor={loading ? 'wait' : ''} size="md" {...getTableProps()} bg={useColorModeValue('white', 'gray.800')} w="full" pos="relative" height="100%" borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Thead zIndex={1} bg={useColorModeValue('gray.50', '#49556e')} pos="sticky" top="0" boxShadow="md" borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.100', 'gray.700')}>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <Th className="noselect"
                                            isTruncated
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            isNumeric={column.isNumeric}
                                            _hover={{ color: useColorModeValue("black", "gray.200") }}
                                        >
                                            <chakra.span>
                                                {column.render("Header")}
                                                {
                                                    !column.disableSortBy
                                                        ?
                                                        column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <ArrowDownIcon ml={2} color="main.300" aria-label="sorted descending" />
                                                            ) : (
                                                                <ArrowUpIcon ml={2} color="main.300" aria-label="sorted ascending" />
                                                            )
                                                        ) : <ArrowUpDownIcon ml={2} color="main.200" w={2} aria-label="sorted ascending" />
                                                        : null

                                                }
                                            </chakra.span>

                                            {/* Use column.getResizerProps to hook up the events correctly */}
                                            <div
                                                zIndex="0"
                                                {...column.getResizerProps()}
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                                                className={useColorModeValue(`resizer ${column.isResizing ? 'is-resizing' : ''}`, `resizer-dark ${column.isResizing ? 'is-resizing-dark' : ''}`)} />

                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    {
                        !loading ?
                            <Tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <Tr {...row.getRowProps()}
                                            _hover={{
                                                background: useColorModeValue("gray.50", "gray.900"),
                                            }}
                                            _active={{
                                                background: useColorModeValue("gray.100", "gray.600"),
                                            }}
                                            whiteSpace={'nowrap'}
                                            fontSize={14}
                                            cursor="pointer"
                                        >
                                            {row.cells.map((cell) => {
                                                return (

                                                    // <Tooltip marginTop={"-12px"} hasArrow label={cell.render("Cell")}>
                                                    //     <Td isTruncated id="cell" {...cell.getCellProps()}>
                                                    //         {cell.render("Cell")}
                                                    //     </Td>
                                                    // </Tooltip>
                                                    <Td onClick={onRowClick(row, i, cell.column.id)} id="cell" {...cell.getCellProps()} isNumeric={cell.column.isNumeric}>
                                                        {
                                                            cell.column.id === 'selection'
                                                                ? cell.render("Cell")
                                                                : <Marker mark={filter.search ?? ''} options={{ className: "custom-marker-1" }}>
                                                                    <Box isTruncated>{cell.render("Cell")}</Box>
                                                                </Marker>
                                                        }

                                                    </Td>
                                                )
                                            })}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            // : <SkeletonText isLoaded={!data} width="100%" bg={useColorModeValue('gray.50', 'gray.900')} padding={10} noOfLines={6} spacing="6" />
                            : <TableSkeleton />
                    }
                    {
                        !loading && data.length < 1 ? <Box p={6} fontSize={12} fontStyle={'italic'} textColor={'gray'}>No data found</Box> : ''
                    }
                </Tabl>
            </>
        );
    }
    else {
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            page,
            // canPreviousPage,
            // canNextPage,
            pageOptions,
            // pageCount,
            // gotoPage,
            // nextPage,
            // previousPage,
            // setPageSize,
            // Get the state from the instance
            selectedFlatRows,
            state: { pageIndex, size, selectedRowIds },
        } = useTable(
            {
                columns,
                data,
                defaultColumn,
                useControlledState: (state) => {
                    return React.useMemo(
                        () => ({
                            ...state,
                            pageIndex: currentPage,
                        }),
                        [state, currentPage]
                    );
                },
                initialState: { pageIndex: currentPage },
                manualPagination: true,
                pageCount: totalPage,
                getRowID: React.useCallback(data => data.dataSid, []),
            },
            useSortBy,
            usePagination,
            useFlexLayout,
            useResizeColumns,
        );

        const router = useRouter()
        const onRowClick = (rowItem, selectedRow, id) => e => {
            if (itemPage !== '' && id !== 'selection') {
                setSelected(rowItem.original[`${fieldID}`]);
                router.push(`${itemPage}/${rowItem.original[`${fieldID}`]}`);
            }
        };


        return (
            <>
                <Tabl cursor={loading ? 'wait' : ''} size="md" {...getTableProps()} bg={useColorModeValue('white', 'gray.800')} w="full" pos="relative" height="100%" borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
                    <Thead zIndex={3} bg={useColorModeValue('gray.50', '#49556e')} pos="sticky" top="0" boxShadow="md" borderBottomWidth="1px" borderBottomColor={useColorModeValue('gray.200', 'gray.700')}>
                        {headerGroups.map((headerGroup) => (
                            <Tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column) => {
                                    return (
                                        <Th className="noselect"
                                            isTruncated
                                            {...column.getHeaderProps(column.getSortByToggleProps())}
                                            isNumeric={column.isNumeric}
                                            _hover={{ color: useColorModeValue("black", "gray.200") }}
                                        >
                                            <chakra.span>
                                                {column.render("Header")}
                                                {
                                                    !column.disableSortBy
                                                        ?
                                                        column.isSorted ? (
                                                            column.isSortedDesc ? (
                                                                <ArrowDownIcon ml={2} color="main.300" aria-label="sorted descending" />
                                                            ) : (
                                                                <ArrowUpIcon ml={2} color="main.300" aria-label="sorted ascending" />
                                                            )
                                                        ) : <ArrowUpDownIcon ml={2} color="main.200" w={2} aria-label="sorted ascending" />
                                                        : null

                                                }
                                            </chakra.span>

                                            {/* Use column.getResizerProps to hook up the events correctly */}
                                            <div
                                                zindex="1"
                                                {...column.getResizerProps()}
                                                onClick={(e) => { e.preventDefault(); e.stopPropagation() }}
                                                className={useColorModeValue(`resizer ${column.isResizing ? 'is-resizing' : ''}`, `resizer-dark ${column.isResizing ? 'is-resizing-dark' : ''}`)} />

                                        </Th>
                                    );
                                })}
                            </Tr>
                        ))}
                    </Thead>
                    {
                        !loading ?
                            <Tbody {...getTableBodyProps()}>
                                {page.map((row, i) => {
                                    prepareRow(row);
                                    return (
                                        <Tr {...row.getRowProps()}
                                            _hover={{
                                                background: useColorModeValue("gray.50", "gray.900"),
                                            }}
                                            _active={{
                                                background: useColorModeValue("gray.100", "gray.600"),
                                            }}
                                            whiteSpace={'nowrap'}
                                            fontSize={14}
                                            cursor="pointer"
                                        >
                                            {row.cells.map((cell) => {
                                                return (
                                                    // <Tooltip marginTop={"-12px"} hasArrow label={cell.render("Cell")}>
                                                    //     <Td isTruncated id="cell" {...cell.getCellProps()}>
                                                    //         {cell.render("Cell")}
                                                    //     </Td>
                                                    // </Tooltip>
                                                    <Td onClick={onRowClick(row, i, cell.column.id)} isTruncated id="cell" {...cell.getCellProps()}>
                                                        {cell.render("Cell")}
                                                    </Td>
                                                )
                                            })}
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                            : <TableSkeleton />
                    }
                    {
                        !loading && data.length < 1 ? <Box p={6} fontSize={12} fontStyle={'italic'} textColor={'gray'}>No data found</Box> : ''
                    }
                </Tabl>
            </>
        );
    }
}

export default Table
