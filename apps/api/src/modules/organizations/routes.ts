import { Router } from "express";

import {
  getAllOrganizations,
  getOrganizationById,
  create,
  update,
  remove,
} from "./controller";

import { validate } from "../../lib/validation";

import {
  createOrganizationSchema,
  updateOrganizationSchema,
} from "./validation";

const router = Router();

router.get("/", getAllOrganizations);

router.get("/:organizationId", getOrganizationById);

router.post(
  "/",
  validate(createOrganizationSchema),
  create
);

router.patch(
  "/:organizationId",
  validate(updateOrganizationSchema),
  update
);

router.delete(
    "/:organizationId",
    remove
);

export default router;