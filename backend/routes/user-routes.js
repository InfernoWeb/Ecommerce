import express from "express";
import {
  addToCart,
  getCartProducts,
  deleteCartProduct,
} from "../controller/user-controller.js";

const userRouter = express.Router();

userRouter.post("/add-to-cart", addToCart);
userRouter.get("/cartproducts/:userId", getCartProducts);
userRouter.delete("/cart/:userId/:productId", deleteCartProduct);

export default userRouter;
