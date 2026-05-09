// src/routes/schoolRoutes.js
// ─────────────────────────────────────────────────────
//  Defines all routes related to schools.
// ─────────────────────────────────────────────────────

const express                                    = require("express");
const { addSchool, listSchools }                 = require("../controllers/schoolController");
const { validateAddSchool, validateListSchools } = require("../middleware/validate");

const router = express.Router();

// POST /addSchool   – Add a new school
router.post("/addSchool", validateAddSchool, addSchool);

// GET  /listSchools – List schools sorted by proximity
router.get("/listSchools", validateListSchools, listSchools);

module.exports = router;
