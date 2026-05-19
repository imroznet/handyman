const express = require('express');
const multer = require('multer');
const path = require('path');
const { requireAuth } = require('../middleware/auth');
const c = require('../controllers/adminController');
const upload = multer({dest:path.join(__dirname,'../uploads')});
const router = express.Router();

router.get('/login', c.loginPage);
router.post('/login', c.login);
router.post('/logout', c.logout);
router.get('/', requireAuth, c.dashboard);
router.get('/:type', requireAuth, c.list);
router.post('/:type', requireAuth, upload.single('image'), c.create);
router.post('/bookings/:id/status', requireAuth, c.updateBookingStatus);
router.post('/:type/:id/delete', requireAuth, c.delete);

module.exports = router;
