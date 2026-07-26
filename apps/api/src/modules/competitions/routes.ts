import { Router } from "express";

import {
  getAllCompetitions,
  getCompetitionById,
  create,
  update,
  remove,
} from "./controller";

import { validate } from "../../lib/validation";

import {
  createCompetitionSchema,
  updateCompetitionSchema,
} from "./validation";

const router = Router();

router.get("/", getAllCompetitions);

router.get(
  "/:competitionId",
  getCompetitionById
);

router.post(
  "/",
  validate(createCompetitionSchema),
  create
);

router.patch(
  "/:competitionId",
  validate(updateCompetitionSchema),
  update
);

router.delete(
  "/:competitionId",
  remove
);

export default router;