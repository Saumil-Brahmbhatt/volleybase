import { Router } from "express";

import * as controller from "./controller";

const router = Router();

router.get("/", controller.getPlayerSeasons);

router.get("/:playerSeasonId", controller.getPlayerSeason);

router.post("/", controller.createPlayerSeason);

router.put(
  "/:playerSeasonId",
  controller.updatePlayerSeason
);

router.delete(
  "/:playerSeasonId",
  controller.deletePlayerSeason
);

router.put("/:playerSeasonId", controller.updatePlayerSeason);
router.patch("/:playerSeasonId", controller.updatePlayerSeason);

export default router;