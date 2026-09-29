import { Router } from "express";

// TODO: Agregar el Controlador

const router: Router = Router();

router.get('/');
router.get('/:id');
router.post('/');
router.patch('/:id');
router.delete('/:id');
router.patch('/:id/estado');

export default router