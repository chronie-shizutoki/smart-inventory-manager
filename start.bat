@echo off
cd backend

:: Use virtual environment Python executable if available
set VENV_PYTHON=".venv\Scripts\python.exe"
set PYTHON_CMD=python

:: Check if virtual environment exists
if exist %VENV_PYTHON% (
    echo Using virtual environment Python
    set PYTHON_CMD=%VENV_PYTHON%
)

:: Check if Waitress is installed on Windows (Gunicorn is only compatible with Unix/Linux)
echo Checking if Waitress is installed on Windows
%PYTHON_CMD% -c "import waitress" 2> nul

if %ERRORLEVEL% equ 0 (
    echo Trying to start production-level WSGI server using Waitress
    %PYTHON_CMD% -m waitress --listen=0.0.0.0:5000 src.main:app
) else (
    echo Waitress not installed, trying to install
    %PYTHON_CMD% -m pip install waitress
    if %ERRORLEVEL% equ 0 (
        echo Waitress installed successfully, starting server
        %PYTHON_CMD% -m waitress --listen=0.0.0.0:5000 src.main:app
    ) else (
        echo Failed to install Waitress, falling back to Flask development server (for development testing only)
        %PYTHON_CMD% -m src.main
    )
)

pause