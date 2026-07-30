import { Router } from "express";

import * as controller from "./controller";

const router = Router();

router.get("/", controller.getVenues);

router.get("/:venueId", controller.getVenue);

router.post("/", controller.createVenue);

router.put("/:venueId", controller.updateVenue);

router.patch("/:venueId", controller.updateVenue);

router.delete("/:venueId", controller.deleteVenue);

export default router;