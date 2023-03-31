import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProductsTable from "../components/productsTable";
import Product from "../product";
import AddProductDialog from "@/components/addProductDialog";
import { readProducts } from "../apiAccess";
import { displayError } from "@/components/errorDisplay";
import EditProductDialog from "@/components/editProductDialog";

const DIALOG_IDS = {
    addProductDialog: 0,
    editProductDialog: 1,
};

export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [dialogOpen, setDialogOpen] = React.useState(-1);
    const [selectedProduct, setSelectedProduct] =
        React.useState<Product | null>(null);

    const [searchScrumMasterFilter, setSearchScrumMasterFilter] =
        useState<string>("");
    const [searchDeveloperFilter, setSearchDeveloperFilter] =
        useState<string>("");

    function handleDialogClose() {
        setDialogOpen(-1);
        refreshProducts();
    }

    function handleDialogOpen(dialogID: number) {
        setDialogOpen(dialogID);
    }

    function handleDeveloperSearchFieldChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setSearchDeveloperFilter(event.target.value);
    }

    function handleScrumMasterSearchFieldChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        setSearchScrumMasterFilter(event.target.value);
    }

    function refreshProducts() {
        console.log("refreshing products.");
        readProducts()
            .then((products: Product[]) => {
                setProducts(products);
            })
            .catch((err: string) => {
                displayError(err);
            });
    }

    useEffect(() => {
        function applyDeveloperFilter(products: Product[]): Product[] {
            return products.filter((p) => {
                for (const d of p.developers) {
                    if (
                        d
                            .toLowerCase()
                            .includes(
                                searchDeveloperFilter.toLowerCase().trim()
                            )
                    ) {
                        return true;
                    }
                }
                return false;
            });
        }

        function applyScrumMasterFilter(products: Product[]): Product[] {
            return products.filter((p) => {
                return p.scrumMasterName
                    .toLowerCase()
                    .includes(searchScrumMasterFilter.toLowerCase().trim());
            });
        }

        let ps: Product[] = applyDeveloperFilter(products);
        ps = applyScrumMasterFilter(ps);
        setFilteredProducts(ps);
    }, [searchDeveloperFilter, searchScrumMasterFilter, products]);

    useEffect(() => {
        refreshProducts();
    }, []);

    return (
        <>
            <Head>
                <title>Product manager</title>
                <meta name="description" content="Product manager" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.main}>
                <div className={styles["menu-bar-wrapper"]}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="scrum_master_search_field"
                        label="Search scrum master"
                        type="text"
                        className={styles["menu-bar-item"]}
                        variant="outlined"
                        onChange={handleScrumMasterSearchFieldChange}
                        value={searchScrumMasterFilter}
                    />
                    <TextField
                        autoFocus
                        margin="dense"
                        id="developer_search_field"
                        label="Search developer"
                        type="text"
                        className={styles["menu-bar-item"]}
                        variant="outlined"
                        onChange={handleDeveloperSearchFieldChange}
                        value={searchDeveloperFilter}
                    />
                    <Button
                        variant="contained"
                        className={styles["menu-bar-item"]}
                        onClick={() =>
                            handleDialogOpen(DIALOG_IDS.addProductDialog)
                        }
                    >
                        Add product
                    </Button>
                </div>
                <div className={styles["products-table-wrapper"]}>
                    <ProductsTable
                        products={filteredProducts}
                        handleEditDialogOpen={function (product: Product) {
                            setSelectedProduct(product);
                            setDialogOpen(DIALOG_IDS.editProductDialog);
                        }}
                    />
                </div>
                <AddProductDialog
                    open={dialogOpen == DIALOG_IDS.addProductDialog}
                    handleClose={handleDialogClose}
                />
                <EditProductDialog
                    open={dialogOpen == DIALOG_IDS.editProductDialog}
                    product={selectedProduct}
                    handleClose={handleDialogClose}
                />
            </main>
        </>
    );
}
