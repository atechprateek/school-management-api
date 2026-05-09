// src/middleware/validate.js
// ─────────────────────────────────────────────────────
//  Reusable request-validation helpers.
// ─────────────────────────────────────────────────────

/**
 * Validates the body of POST /addSchool
 */
const validateAddSchool = (req, res, next) => {
  const { name, address, latitude, longitude } = req.body;

  const errors = [];

  // Presence checks
  if (!name    || typeof name    !== "string" || name.trim()    === "")
    errors.push("'name' is required and must be a non-empty string.");

  if (!address || typeof address !== "string" || address.trim() === "")
    errors.push("'address' is required and must be a non-empty string.");

  // Numeric type checks
  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (latitude === undefined || latitude === null || latitude === "" || isNaN(lat))
    errors.push("'latitude' is required and must be a valid number.");
  else if (lat < -90 || lat > 90)
    errors.push("'latitude' must be between -90 and 90.");

  if (longitude === undefined || longitude === null || longitude === "" || isNaN(lon))
    errors.push("'longitude' is required and must be a valid number.");
  else if (lon < -180 || lon > 180)
    errors.push("'longitude' must be between -180 and 180.");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  // Attach parsed numbers so the controller doesn't repeat the work
  req.body.latitude  = lat;
  req.body.longitude = lon;

  next();
};

/**
 * Validates the query params of GET /listSchools
 */
const validateListSchools = (req, res, next) => {
  const { latitude, longitude } = req.query;

  const errors = [];

  const lat = parseFloat(latitude);
  const lon = parseFloat(longitude);

  if (latitude === undefined || latitude === "" || isNaN(lat))
    errors.push("Query param 'latitude' is required and must be a valid number.");
  else if (lat < -90 || lat > 90)
    errors.push("'latitude' must be between -90 and 90.");

  if (longitude === undefined || longitude === "" || isNaN(lon))
    errors.push("Query param 'longitude' is required and must be a valid number.");
  else if (lon < -180 || lon > 180)
    errors.push("'longitude' must be between -180 and 180.");

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: "Validation failed.",
      errors,
    });
  }

  req.query.latitude  = lat;
  req.query.longitude = lon;

  next();
};

module.exports = { validateAddSchool, validateListSchools };
