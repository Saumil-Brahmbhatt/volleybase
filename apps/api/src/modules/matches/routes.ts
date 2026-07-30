import { Router } from "express";

import * as controller from "./controller";

const router = Router();

router.get("/", controller.getMatches);

router.get("/:matchId", controller.getMatch);

router.post("/", controller.createMatch);

router.put("/:matchId", controller.updateMatch);

router.patch("/:matchId", controller.updateMatch);

router.delete("/:matchId", controller.deleteMatch);

export default router;