import { Router } from "express";

import {
  getAllSeasons,
  getSeasonById,
  create,
  update,
  remove,
} from "./controller";

import { validate } from "../../lib/validation";

import {
  createSeasonSchema,
  updateSeasonSchema,
} from "./validation";

const router = Router();

router.get("/", getAllSeasons);

router.get(
  "/:seasonId",
  getSeasonById
);

router.post(
  "/",
  validate(createSeasonSchema),
  create
);

router.patch(
  "/:seasonId",
  validate(updateSeasonSchema),
  update
);

router.delete(
  "/:seasonId",
  remove
);

export default router;