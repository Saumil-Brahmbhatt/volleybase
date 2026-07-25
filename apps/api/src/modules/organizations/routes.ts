import { Router } from "express";

import {
  getAllOrganizations,
  getOrganizationById,
} from "./controller";

const router = Router();

router.get("/", getAllOrganizations);

router.get("/:organizationId", getOrganizationById);

export default router;