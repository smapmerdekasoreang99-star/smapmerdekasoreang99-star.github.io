@echo off
setlocal EnableExtensions EnableDelayedExpansion
title Pasang Aplikasi Sekolah
rem Pemasang Beranda Aplikasi Sekolah. Tanpa hak admin, tanpa PowerShell.
rem Menyalin halaman ke %LOCALAPPDATA%\BerandaSekolah, lalu membuat ikon di Desktop dan menu Start.
rem Pilihan bisa diberikan langsung: PASANG.cmd 1  atau  PASANG.cmd 2
set "ASAL=%~dp0berkas"
if not defined BERANDA_TUJUAN set "BERANDA_TUJUAN=%LOCALAPPDATA%\BerandaSekolah"
if not defined BERANDA_START set "BERANDA_START=%APPDATA%\Microsoft\Windows\Start Menu\Programs"
if not defined BERANDA_DESKTOP (
  for /f "skip=2 tokens=2,*" %%a in ('reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Explorer\User Shell Folders" /v Desktop 2^>nul') do call set "BERANDA_DESKTOP=%%b"
  if not defined BERANDA_DESKTOP set "BERANDA_DESKTOP=%USERPROFILE%\Desktop"
)
if not exist "%ASAL%\beranda.html" (
  echo   Folder "berkas" tidak ditemukan. Jalankan PASANG.cmd dari dalam folder hasil Extract, bukan dari dalam zip.
  goto :gagal
)
set "PIL=%~1"
if not defined PIL (
  echo.
  echo   PASANG BERANDA APLIKASI SEKOLAH - SMA Plus Merdeka Soreang
  echo   ==========================================================
  echo.
  echo   1 = Siswa dan guru   ^(untuk laptop guru, kelas, atau lab^)
  echo   2 = Lengkap + Staf   ^(hanya untuk laptop staf, TU, pimpinan^)
  echo.
  choice /c 12 /n /m "  Ketik 1 atau 2: "
  set "PIL=!errorlevel!"
)
if "%PIL%"=="2" (set "HAL=beranda-staf.html") else (set "HAL=beranda.html")

if not exist "%BERANDA_TUJUAN%" mkdir "%BERANDA_TUJUAN%" || goto :gagal
copy /y "%ASAL%\beranda.html" "%BERANDA_TUJUAN%\" >nul || goto :gagal
copy /y "%ASAL%\beranda.ico" "%BERANDA_TUJUAN%\" >nul || goto :gagal
if "%HAL%"=="beranda-staf.html" (
  copy /y "%ASAL%\beranda-staf.html" "%BERANDA_TUJUAN%\" >nul || goto :gagal
) else (
  if exist "%BERANDA_TUJUAN%\beranda-staf.html" del /q "%BERANDA_TUJUAN%\beranda-staf.html"
)
> "%BERANDA_TUJUAN%\versi.txt" echo halaman=%HAL%
>>"%BERANDA_TUJUAN%\versi.txt" echo dipasang=%DATE% %TIME%

rem Alamat berkas untuk pintasan: garis miring maju, spasi menjadi %20
set "U=%BERANDA_TUJUAN%\%HAL%"
set "U=!U:\=/!"
set "U=!U: =%%20!"
for %%d in ("%BERANDA_DESKTOP%" "%BERANDA_START%") do (
  if not exist "%%~d" mkdir "%%~d"
  > "%%~d\Aplikasi Sekolah.url" (
    echo [InternetShortcut]
    echo URL=file:///!U!
    echo IconFile=%BERANDA_TUJUAN%\beranda.ico
    echo IconIndex=0
  ) || goto :gagal
)
echo.
echo   BERHASIL. Ikon "Aplikasi Sekolah" sudah ada di Desktop dan menu Start.
echo   Klik dua kali ikon itu untuk membuka daftar aplikasi.
echo.
if not defined BERANDA_UJI (
  start "" "%BERANDA_TUJUAN%\%HAL%"
  pause
)
exit /b 0

:gagal
echo.
echo   GAGAL memasang. Foto layar ini dan kirim ke pengelola aplikasi.
echo.
if not defined BERANDA_UJI pause
exit /b 1
