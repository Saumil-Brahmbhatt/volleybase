import { Router } from "express";

import {
  getAllTeams,
  getTeamById,
  create,
  update,
  remove,
} from "./controller";

import { validate } from "../../lib/validation";

import {
  createTeamSchema,
  updateTeamSchema,
} from "./validation";

const router = Router();

router.get("/", getAllTeams);

router.get("/:teamId", getTeamById);

router.post(
  "/",
  validate(createTeamSchema),
  create
);

router.patch(
  "/:teamId",
  validate(updateTeamSchema),
  update
);

router.delete(
  "/:teamId",
  remove
);

export default router;