@echo off

 if "%app_conf_file%" == "" (
    echo "app_conf_file not set "
    activator -Dhttp.port=9000 svc/run
 ) else (
    echo "app_conf_file set to " %app_conf_file%
    activator -Dconfig.resource=%app_conf_file% -Dhttp.port=9000 svc/run
 )
