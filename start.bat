@echo off
cd backend\inventory-api

:: Check if Waitress is installed on Windows (Gunicorn is only compatible with Unix/Linux)
echo Checking if Waitress is installed on Windows
python -c "import waitress" 2> nul

if %ERRORLEVEL% equ 0 (
    echo Trying to start production-level WSGI server using Waitress
    python -m waitress --listen=0.0.0.0:5000 src.main:app
) else (
    echo Waitress not installed, trying to install
    pip install waitress
    if %ERRORLEVEL% equ 0 (
        echo Waitress installed successfully, starting server
        python -m waitress --listen=0.0.0.0:5000 src.main:app
    ) else (
        echo Failed to install Waitress, falling back to Flask development server (for development testing only)
        python -m src.main
    )
)

pause