import express from 'express';

import { createTags, deleteTags, getTags } from '../Controllers/tags.js';

import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTags);
router.post('/', auth, createTags);
router.delete('/:id', auth, deleteTags);

export default router;