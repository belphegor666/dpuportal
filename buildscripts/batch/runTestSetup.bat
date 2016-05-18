@echo off

 if "%app.conf.file%" == "" (
    echo "app.conf.file not set "
    activator -Dhttp.port=9001 testsetup/run
 ) else (
    echo "app.conf.file set to " %app.conf.file%
    activator -Dconfig.resource=%app.conf.file% -Dhttp.port=9001 testsetup/run
 )
