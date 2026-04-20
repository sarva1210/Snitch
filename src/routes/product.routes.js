import express from 'express';
import { authenticateSeller } from '../middlewares/auth.middleware.js';
import { createProduct, getSellerProducts, getAllProducts, getProductDetails, addProductVariant } from '../controllers/product.controller.js';
import multer from "multer";
import { createProductValidator } from '../validator/product.validator.js';


const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

const router = express.Router();

//POST /api/products  ;  Create a new product   ;   Private (Seller only)
router.post("/", authenticateSeller, upload.array('images', 7), createProductValidator, createProduct)


//GET /api/products/seller  ;    Get all products of the authenticated seller  ;   Private (Seller only)
router.get("/seller", authenticateSeller, getSellerProducts)

// GET /api/products    ;     Get all products     ;     Public
router.get("/", getAllProducts)

//GET /api/products/detail/:id    ;    Get product details by ID   ;   Public
router.get("/detail/:id", getProductDetails)

//post /api/products/:productId/variants   ;   Add a new variant to a product   ;   Private (Seller only)
router.post("/:productId/variants", authenticateSeller, upload.array('images', 7), addProductVariant)

export default router;