// src/controllers/schoolController.js
// ─────────────────────────────────────────────────────
//  Business logic for the School Management APIs.
// ─────────────────────────────────────────────────────

const db = require("../config/db");

// ── Haversine formula ─────────────────────────────────
// Returns the great-circle distance (in km) between
// two lat/lon coordinates.
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371; // Earth's radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// ── POST /addSchool ───────────────────────────────────
const addSchool = async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    const [result] = await db.execute(
      "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
      [name.trim(), address.trim(), latitude, longitude]
    );

    return res.status(201).json({
      success: true,
      message: "School added successfully.",
      data: {
        id:        result.insertId,
        name:      name.trim(),
        address:   address.trim(),
        latitude,
        longitude,
      },
    });
  } catch (error) {
    console.error("addSchool error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// ── GET /listSchools ──────────────────────────────────
const listSchools = async (req, res) => {
  try {
    const { latitude: userLat, longitude: userLon } = req.query;

    const [schools] = await db.execute(
      "SELECT id, name, address, latitude, longitude FROM schools"
    );

    // Calculate distance for each school, then sort ascending
    const schoolsWithDistance = schools.map((school) => ({
      ...school,
      distance_km: parseFloat(
        haversineDistance(userLat, userLon, school.latitude, school.longitude).toFixed(2)
      ),
    }));

    schoolsWithDistance.sort((a, b) => a.distance_km - b.distance_km);

    return res.status(200).json({
      success: true,
      message: `${schoolsWithDistance.length} school(s) found.`,
      userLocation: { latitude: userLat, longitude: userLon },
      data: schoolsWithDistance,
    });
  } catch (error) {
    console.error("listSchools error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

module.exports = { addSchool, listSchools };
