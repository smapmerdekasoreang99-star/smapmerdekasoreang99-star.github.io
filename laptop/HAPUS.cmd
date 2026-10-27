@echo off
setlocal EnableExtensions
title Hapus Aplikasi Sekolah
if not defined BERANDA_TUJUAN set "BERANDA_TUJUAN=%LOCALAPPDATA%\BerandaSekolah"
if not defined BERANDA_START set "BERANDA_START=%APPDATA%\Microsoft\Windows\Start Menu\Programs"
if not defined BERANDA_DESKTOP (
  for /f "skip=2 tokens=2,*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v Desktop 2^>nul') do call set "BERANDA_DESKTOP=%%b"
  if not defined BERANDA_DESKTOP set "BERANDA_DESKTOP=%USERPROFILE%\Desktop"
)
if not defined BERANDA_UJI (
  echo.
  choice /c YT /n /m "  Hapus Beranda Aplikasi Sekolah dari laptop ini? (Y = ya, T = tidak): "
  if errorlevel 2 exit /b 0
)
for %%d in ("%BERANDA_DESKTOP%" "%BERANDA_START%") do if exist "%%~d\Aplikasi Sekolah.url" del /q "%%~d\Aplikasi Sekolah.url"
rem Folder hanya dihapus bila memang buatan pemasang ini (ada versi.txt)
if exist "%BERANDA_TUJUAN%\versi.txt" rmdir /s /q "%BERANDA_TUJUAN%"
echo.
echo   Selesai. Beranda sudah dihapus dari laptop ini.
echo.
if not defined BERANDA_UJI pause
exit /b 0
