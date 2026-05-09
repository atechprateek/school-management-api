-- =====================================================
--  School Management Database Setup
--  Run this file once in MySQL Workbench or CLI:
--  mysql -u root -p < database.sql
-- =====================================================

CREATE DATABASE IF NOT EXISTS school_management;

USE school_management;

CREATE TABLE IF NOT EXISTS schools (
  id        INT           NOT NULL AUTO_INCREMENT,
  name      VARCHAR(255)  NOT NULL,
  address   VARCHAR(500)  NOT NULL,
  latitude  FLOAT         NOT NULL,
  longitude FLOAT         NOT NULL,
  PRIMARY KEY (id)
);

-- Optional: seed some sample data
INSERT INTO schools (name, address, latitude, longitude) VALUES
  ('Delhi Public School',   'Sector 45, Noida, UP',          28.5706,  77.3260),
  ('Ryan International',    'Vasant Kunj, New Delhi',        28.5200,  77.1580),
  ('Kendriya Vidyalaya',    'Lodhi Road, New Delhi',         28.5932,  77.2212);
