import { Router } from "express";

import { createAcreditacion } from "../controllers/acreditacion-create.controller";
import { findAllAcreditaciones } from "../controllers/acreditacion-findAll.controller";
import { findAcreditacionById } from "../controllers/acreditacion-getById.controller";
import { updateAcreditacion } from "../controllers/acreditacion-update.controller";

const router: Router = Router();

router.get('/', findAllAcreditaciones);
router.get('/:id', findAcreditacionById);
router.post('/', createAcreditacion);
router.patch('/:id', updateAcreditacion);
router.delete('/:id');
router.patch('/:id/estado');

export default router