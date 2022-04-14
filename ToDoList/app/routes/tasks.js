const express = require('express');
const router = express.Router();

const { getAll, getById, add, updateById, deleteById } = require('../controllers/tasks');
// get all, get by id, add, update by id and delete by id

router.route("/").get(getAll);
router.route("/:id").get(getById);
router.route("/").post(add);
router.route("/:id").put(updateById);
router.route("/:id").delete(deleteById);

module.exports = router;