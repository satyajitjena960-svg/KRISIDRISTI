@echo off
echo =========================================================
echo   KrishiDrishti - Launch with PostgreSQL Database
echo =========================================================
echo.
set /p PG_USER="Enter PostgreSQL User [default: postgres]: "
if "%PG_USER%"=="" set PG_USER=postgres

set /p PG_PASS="Enter PostgreSQL Password [default: postgres]: "
if "%PG_PASS%"=="" set PG_PASS=postgres

set /p PG_DB="Enter Database Name [default: smartcrop_db]: "
if "%PG_DB%"=="" set PG_DB=smartcrop_db

echo.
echo Connecting to jdbc:postgresql://localhost:5432/%PG_DB% as user '%PG_USER%'...
cd backend
java -jar target\smart-crop-backend-1.0.0.jar --spring.datasource.username=%PG_USER% --spring.datasource.password=%PG_PASS% --spring.datasource.url=jdbc:postgresql://localhost:5432/%PG_DB%
pause
