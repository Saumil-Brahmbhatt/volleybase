import { Router } from "express";

import * as controller from "./controller";

const router = Router();

router.get("/", controller.getOfficials);

router.get("/:officialId", controller.getOfficial);

router.post("/", controller.createOfficial);

router.put("/:officialId", controller.updateOfficial);

router.patch("/:officialId", controller.updateOfficial);

router.delete("/:officialId", controller.deleteOfficial);

export default router;