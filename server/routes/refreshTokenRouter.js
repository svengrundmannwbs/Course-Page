import { Router } from "express";
import * as refreshTokenController from "../controllers/refreshTokenController.js";

const refreshRouter = Router();

refreshRouter.get("/refresh", refreshTokenController.refreshToken);

export default refreshRouter;
