import { Router } from "express";
import { getPlayers } from "./controller";

const router = Router();

router.get("/", getPlayers);

export default router;