import { Router } from "express";

import {
  getAllPlayers,
  getPlayerById,
  create,
  update,
  remove,
} from "./controller";

import { validate } from "../../lib/validation";

import {
  createPlayerSchema,
  updatePlayerSchema,
} from "./validation";

const router = Router();

router.get("/", getAllPlayers);

router.get(
  "/:playerId",
  getPlayerById
);

router.post(
  "/",
  validate(createPlayerSchema),
  create
);

router.patch(
  "/:playerId",
  validate(updatePlayerSchema),
  update
);

router.delete(
  "/:playerId",
  remove
);

export default router;