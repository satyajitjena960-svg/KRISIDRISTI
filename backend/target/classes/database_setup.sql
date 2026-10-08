-- =========================================================================
-- PostgreSQL Database Initialization Script for KrishiDrishti
-- =========================================================================

-- 1. Create Database (Run as postgres superuser in pgAdmin or psql)
CREATE DATABASE smartcrop_db;

-- 2. Connect to the database
\c smartcrop_db;

-- Note: Spring Data JPA (Hibernate) will automatically create all tables 
-- (farmers, farm_plots, diagnoses, follow_up_records, crop_health_histories, 
-- weather_risk_assessments, outbreak_records, notification_alerts)
-- and DataSeeder will populate initial realistic Odisha agricultural demo data!
