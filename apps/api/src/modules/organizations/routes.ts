import { Router } from "express";

import {
  getAllOrganizations,
  getOrganizationById,
  create,
} from "./controller";

import { validate } from "../../lib/validation";
import { createOrganizationSchema } from "./validation";

const router = Router(); // 👈 This must exist BEFORE router.get/post

router.get("/", getAllOrganizations);

router.get("/:organizationId", getOrganizationById);

console.log(create);
console.log(validate);
console.log(createOrganizationSchema);

router.post(
  "/",
  validate(createOrganizationSchema),
  create
);

export default router;