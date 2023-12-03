import React from "react";
import {useFlexLayout, usePagination, useResizeColumns, useSortBy, useTable} from "react-table";
import {
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftAddon,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Tooltip,
    useColorModeValue
} from "@chakra-ui/react";
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon,} from "@chakra-ui/icons";
import FeatherIcon from 'feather-icons-react';
import FooterProps from "@Components/FooterProps";

function TableFooter({
    data,
    columns,
    setPage,
    setSize,
    currentPage,
    pageSize,
    totalPage,
    totalItems }) {

    const defaultColumn = React.useMemo(
        () => ({
            minWidth: 30,
            width: 250,
            // maxWidth: 400,
        }),
        []
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
        state: { pageIndex, size },
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
            autoResetPage: false,
            manualPagination: true,
            pageCount: totalPage,
        },
        useSortBy,
        usePagination,
        useFlexLayout,
        useResizeColumns
    );


    return (
        <FooterProps>
            <Flex justifyContent="space-between" my={2} mx={4} alignItems="center">
                <HStack>
                    <Tooltip label={'Total ' + totalItems + ' — Page ' + (pageIndex + 1) + ' of ' + totalPage}>
                        <InputGroup size="sm" as="span" w='unset'>
                            <InputLeftAddon children={<FeatherIcon icon={'database'} color="gray.400" size={14} />} />
                            <Input isDisabled variant="filled" size="sm" width={28} value={totalPage === undefined ? "loading..." : totalItems + " - " + Number(pageIndex + 1) + ' / ' + totalPage} />
                        </InputGroup>
                    </Tooltip>
                    <Tooltip label="Go to Page">
                        <InputGroup size="sm" w={'unset'} >
                            <InputLeftAddon
                                pointerEvents="none"
                                children={<FeatherIcon icon={'arrow-up-right'} color="gray.400" size={14} />}
                            />
                            <NumberInput
                                size="sm"
                                min={1}
                                width={28}
                                defaultValue={Number(pageIndex + 1)}
                                value={Number(pageIndex + 1)}
                                variant="filled"
                                max={totalPage}
                                borderColor={useColorModeValue('gray.200', '#5f6770')}
                                onChange={(value) => {
                                    const page = value ? Number(value) - 1 : 1;
                                    setPage(page);
                                }}
                            >
                                <NumberInputField borderColor="gray.300" />
                                <NumberInputStepper>
                                    <NumberIncrementStepper children={<FeatherIcon icon={'chevron-up'} size={14} />} />
                                    <NumberDecrementStepper children={<FeatherIcon icon={'chevron-down'} size={14} />} />
                                </NumberInputStepper>
                            </NumberInput>
                        </InputGroup>
                    </Tooltip>
                    <Tooltip label={'Show ' + pageSize + ' per Page'}>
                        <Select
                            size="sm"
                            variant="filled"
                            w={32}
                            value={pageSize}
                            onChange={(e) => {
                                setSize(Number(e.target.value));
                            }}
                        >
                            {[5, 10, 20, 30, 40, 50].map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </Select>
                    </Tooltip>
                </HStack>

                <Flex >
                    <Tooltip label="First Page">
                        <IconButton
                            size="sm"
                            aria-label="First"
                            onClick={() => setPage(0)}
                            isDisabled={currentPage === 0 || totalPage === undefined}
                            icon={<ArrowLeftIcon h={3} w={3} />}
                            mr={4}
                        />
                    </Tooltip>
                    <Tooltip label="Previous Page">
                        <IconButton
                            size="sm"
                            aria-label="Previous"
                            onClick={() => {
                                setPage((s) => (s === 0 ? 0 : s - 1));
                            }}
                            isDisabled={currentPage === 0 || totalPage === undefined}
                            icon={<ChevronLeftIcon h={6} w={6} />}
                        />
                    </Tooltip>

                    <Tooltip label="Next Page">
                        <IconButton
                            size="sm"
                            aria-label="Next"
                            marginLeft="6"
                            onClick={() => {
                                setPage((s) => s + 1);
                            }}
                            isDisabled={currentPage === totalPage - 1 || totalPage === undefined}
                            icon={<ChevronRightIcon h={6} w={6} />}
                        />
                    </Tooltip>
                    <Tooltip label="Last Page">
                        <IconButton
                            size="sm"
                            aria-label="Last"
                            onClick={() => {
                                setPage(totalPage - 1);
                            }}
                            isDisabled={currentPage === totalPage - 1 || totalPage === undefined}
                            icon={<ArrowRightIcon h={3} w={3} />}
                            ml={4}
                        />
                    </Tooltip>
                </Flex>
            </Flex>
        </FooterProps>
    );
}

export default TableFooter