REM http://ecs.victoria.ac.nz/foswiki/pub/Main/JavaResources/UI.html << UI Information used within the ECS100 library
REM "C:\Program Files\Java\jdk1.8.0_161\jre\lib\ext\ecs100.jar" << Ensure that ECS is installed within the JRE\lib\ext folder



REM cls 
SETLOCAL 
SET parentFolder=%~dp0
SET WorkFolder=%parentFolder%
REM SET Project=GeneSearch
REM DEL %WorkFolder% /s /q /f *.class 
REM DEL "%WorkFolder%%Project%.class"
REM cls 

REM "%JAVA_HOME%"\bin\javac.exe "%WorkFolder%\%Project%.java"
REM "%JAVA_HOME%"\bin\java.exe %Project%
cd %parentFolder%
npm install
bower install
node start %parentFolder%\"server.js"