import express from "express";
import { login, register, refreshToken } from "../controller/auth.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh-token", refreshToken);

export default authRouter;
