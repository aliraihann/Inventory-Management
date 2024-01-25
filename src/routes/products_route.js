import express from 'express';
import { getTokenAuthentication, updateItemTokenAuthentication, updateQuantityTokenAuthentication } from '../middleware/token_middleware.js';
import { insertItem, inventory, removeItem, editQuantity } from '../controllers/products_controller.js';
const router = express.Router();

router.post('/add', updateItemTokenAuthentication , insertItem );
router.get('/list',getTokenAuthentication, inventory );
router.put('/quantity',updateQuantityTokenAuthentication , editQuantity)
router.delete('/delete', updateItemTokenAuthentication, removeItem );

export default router;