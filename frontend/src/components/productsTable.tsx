import Head from "next/head";
import styles from "@/styles/Home.module.css";
import {
    Button,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    TablePagination,
} from "@mui/material";
import React, { useState } from "react";
import Product from "../product";

interface Column {
    id: string;
    label: string;
    width: string;
    align: "left" | "right";
}

const rowsPerPage = 10;

export default function ProductsTable(props: { products: Product[] }) {
    const [page, setPage] = useState<number>(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const columns: readonly Column[] = [
        {
            id: "productId",
            label: "Product number (ID)",
            width: "15%",
            align: "left",
        },
        {
            id: "productName",
            label: "Product name",
            width: "30%",
            align: "right",
        },
        {
            id: "scrumMasterName",
            label: "Scrum master",
            width: "15%",
            align: "right",
        },
        {
            id: "productOwnerName",
            label: "Product owner",
            width: "15%",
            align: "right",
        },
        {
            id: "developers",
            label: "Developers",
            width: "15%",
            align: "right",
        },
        { id: "startDate", label: "Start date", width: "10%", align: "right" },
        {
            id: "methodology",
            label: "Methodology",
            width: "10%",
            align: "right",
        },
    ];

    return (
        <Paper sx={{ width: "80%", overflow: "hidden" }}>
            <TableContainer sx={{ height: "50vh" }}>
                <Table stickyHeader aria-label="sticky table" size="small">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.products
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((p) => (
                                <TableRow key={p.productId}>
                                    <TableCell scope="row" align="left">
                                        {p.productId}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.productName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.scrumMasterName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.productOwnerName}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.developers}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.startDate}
                                    </TableCell>
                                    <TableCell align="right">
                                        {p.methodology}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                component="div"
                count={props.products.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[10]}
            />
        </Paper>
    );
}