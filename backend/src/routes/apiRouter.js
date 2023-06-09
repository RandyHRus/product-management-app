"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dataAccess = require("../dataAccess");
const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const cors = require("cors");
const bodyParser = require("body-parser");
const swaggerDocs = require("./swagger.json");
const apiRouter = express.Router();
apiRouter.use(bodyParser.json()); //parse request body
apiRouter.use(cors()); // enable cross-origin requests
apiRouter.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
// middleware to load data into memory.
apiRouter.use((req, res, next) => {
    console.log("loading products into memory");
    dataAccess.loadProductsFromFile();
    next();
});
// middleware to display request information
apiRouter.use((req, res, next) => {
    console.log("Received request");
    console.log("params: " + JSON.stringify(req.params));
    console.log("body: " + JSON.stringify(req.body));
    next();
});
apiRouter.get("/healthcheck", (req, res) => {
    res.status(200).send("healthy");
});
apiRouter.get("/products", (req, res) => {
    try {
        let products = dataAccess.getAllProducts();
        res.status(200).send(products);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
// Get one product using productId
apiRouter.get("/product/:productId", (req, res) => {
    try {
        let product = dataAccess.getProduct(req.params.productId);
        res.status(200).send(product);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
// Post one new product
apiRouter.post("/product", (req, res) => {
    try {
        let product = dataAccess.postProduct(req.body);
        res.status(200).send(product);
    }
    catch (error) {
        try {
            let parse = JSON.parse(error.message);
            res.status(400).send(parse);
        }
        catch (error2) {
            res.status(400).send({ error: error.message });
        }
    }
});
// Put one product
apiRouter.put("/product", (req, res) => {
    try {
        let product = dataAccess.putProduct(req.body);
        res.status(200).send(product);
    }
    catch (error) {
        try {
            let parse = JSON.parse(error.message);
            res.status(400).send(parse);
        }
        catch (error2) {
            res.status(400).send({ error: error.message });
        }
    }
});
// Delete one product using productId
apiRouter.delete("/product/:productId", (req, res) => {
    try {
        dataAccess.deleteProduct(req.params.productId);
        res.status(200).send(req.params.productId);
    }
    catch (error) {
        res.status(400).send({ error: error.message });
    }
});
module.exports = apiRouter;
