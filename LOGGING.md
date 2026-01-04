# Logging Guide

This document explains where to find and how to view logs for the Portfolio application.

## Log Locations

### 1. Console Output (Development)
When running with `mvn spring-boot:run`, logs appear directly in the terminal/console where you started the application.

**To view logs in real-time:**
```bash
mvn spring-boot:run
```

The logs will show:
- Application startup messages
- HTTP request logs
- Database queries (if enabled)
- Error messages
- Application events

### 2. Log File (Production)
When running the application (either via Maven or JAR), logs are written to:
```
logs/portfolio.log
```

**Location:** `D:\PROJECTS\portfolio\logs\portfolio.log`

**To view logs in real-time:**
```powershell
# Windows PowerShell
Get-Content logs\portfolio.log -Wait -Tail 50

# Or using tail equivalent
Get-Content logs\portfolio.log -Wait
```

**To view last N lines:**
```powershell
Get-Content logs\portfolio.log -Tail 100
```

### 3. When Running as JAR
If you run the application as a JAR file:
```bash
java -jar target/portfolio-0.0.1-SNAPSHOT.jar
```

Logs will appear:
- **Console:** Standard output (stdout)
- **File:** `logs/portfolio.log` (in the directory where you run the JAR)

## Log Levels

Current configuration:
- **Root level:** INFO
- **Application packages:** DEBUG (com.believe.portfolio)
- **Spring Framework:** INFO
- **Hibernate:** INFO

## Viewing Logs

### Option 1: View in Terminal (Current Session)
If you started the app with `mvn spring-boot:run`, the logs are in that terminal window.

### Option 2: View Log File
```powershell
# View entire log file
notepad logs\portfolio.log

# View last 50 lines
Get-Content logs\portfolio.log -Tail 50

# Follow logs in real-time (like tail -f)
Get-Content logs\portfolio.log -Wait
```

### Option 3: Use a Log Viewer
You can use any text editor or log viewer:
- Notepad++
- VS Code
- Any text editor

## Log Rotation

Logs are automatically rotated:
- **Max file size:** 10MB
- **Max history:** 10 files
- **Naming:** `portfolio.log`, `portfolio.log.1`, `portfolio.log.2`, etc.

## Changing Log Levels

Edit `src/main/resources/application.properties`:

```properties
# More verbose logging
logging.level.com.believe.portfolio=DEBUG
logging.level.org.springframework.web=DEBUG

# Less verbose logging
logging.level.root=WARN
logging.level.com.believe.portfolio=INFO
```

## Viewing Specific Log Types

### View only errors:
```powershell
Select-String -Path logs\portfolio.log -Pattern "ERROR"
```

### View only API requests:
```powershell
Select-String -Path logs\portfolio.log -Pattern "GET|POST|PUT|DELETE"
```

### View database queries:
```powershell
Select-String -Path logs\portfolio.log -Pattern "Hibernate|SQL"
```

## Quick Commands

```powershell
# Create logs directory if it doesn't exist
New-Item -ItemType Directory -Force -Path logs

# View last 20 lines
Get-Content logs\portfolio.log -Tail 20

# Follow logs (real-time)
Get-Content logs\portfolio.log -Wait

# Search for errors
Select-String -Path logs\portfolio.log -Pattern "ERROR|Exception"

# Count log entries
(Get-Content logs\portfolio.log).Count
```

## Troubleshooting

### Log file not created?
1. Check if `logs` directory exists
2. Check file permissions
3. Verify logging configuration in `application.properties`

### Too many logs?
Increase the log level to WARN or ERROR:
```properties
logging.level.root=WARN
```

### Need more detail?
Decrease the log level to DEBUG:
```properties
logging.level.com.believe.portfolio=DEBUG
logging.level.org.springframework.web=DEBUG
```

