const express = require("express");
const router = express.Router();

const ContactController = require("../Controllers/ContactControlleur");

router.post('/add', ContactController.addContact)
router.post('/:id/modify', ContactController.modifyContact)
router.get('/:id/delete', ContactController.deleteContact)
router.get('/show', ContactController.showContacts)

module.exports = router;