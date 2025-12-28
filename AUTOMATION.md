# Automation Setup Documentation

This project includes comprehensive automation for continuous integration, build, deployment, and error fixing.

## Overview

The automation system monitors the `ClaudeCode` branch for changes and automatically:
1. Pulls changes from remote
2. Builds the project
3. Deploys to the database
4. Fixes common errors automatically
5. Pushes fixes back to remote
6. Merges successful builds to `dev` branch

## Components

### 1. GitHub Actions Workflow (`.github/workflows/auto-build-deploy.yml`)

**Triggers:**
- Push to `ClaudeCode` branch
- Pull requests to `ClaudeCode` branch

**Actions:**
- Installs dependencies
- Runs `npm run build`
- Runs `cds deploy`
- Auto-fixes common ES module errors
- Commits and pushes fixes if needed
- Merges to `dev` branch on success

### 2. Git Post-Merge Hook (`.git/hooks/post-merge`)

**Triggers:**
- After `git pull` or `git merge` completes

**Actions:**
- Checks if on `ClaudeCode` branch
- Installs/updates dependencies
- Runs build and deploy
- Auto-fixes build errors
- Commits and pushes fixes

**Note:** This hook runs locally and provides immediate feedback.

### 3. Manual Automation Scripts

#### Linux/Mac: `scripts/auto-pull-build-watch.sh`
```bash
./scripts/auto-pull-build-watch.sh
```

#### Windows: `scripts/auto-pull-build-watch.bat`
```cmd
scripts\auto-pull-build-watch.bat
```

**Actions:**
- Switches to `ClaudeCode` branch if needed
- Pulls latest changes from remote
- Installs dependencies
- Builds and deploys
- Auto-fixes errors
- Starts `cds watch` for live development

## Common Auto-Fixes

The automation handles these common issues:

### 1. ES Module Syntax Errors
**Problem:** `require is not defined in ES module scope`

**Fix:**
- Converts `const cds = require('@sap/cds')` to `import cds from '@sap/cds'`
- Converts `module.exports = class` to `export default class`

### 2. Build Failures
**Actions:**
- Runs auto-fix scripts
- Retries build
- Commits fixes if successful
- Pushes to remote

### 3. Deploy Failures
**Actions:**
- Logs errors for review
- Requires manual intervention for complex issues

## Usage

### Automatic (Recommended)

1. **Make changes locally or remotely on `ClaudeCode` branch**
2. **Pull changes:**
   ```bash
   git pull origin ClaudeCode
   ```
3. **Post-merge hook automatically runs:**
   - Builds
   - Deploys
   - Fixes errors if needed
   - Pushes fixes

### Manual Script

**Windows:**
```cmd
scripts\auto-pull-build-watch.bat
```

**Linux/Mac:**
```bash
./scripts/auto-pull-build-watch.sh
```

### GitHub Actions

**Automatically triggered on:**
- Push to `ClaudeCode` branch
- Pull request to `ClaudeCode` branch

**View workflow runs:**
```bash
gh run list --workflow=auto-build-deploy.yml
```

**View specific run:**
```bash
gh run view <run-id>
```

## Workflow Diagram

```
Remote ClaudeCode Push
         ↓
   GitHub Actions
         ↓
    Build & Deploy
         ↓
    Error Detected?
         ↓
    Yes → Auto-Fix → Retry → Success?
         ↓                      ↓
        No                     Yes
         ↓                      ↓
   Manual Review         Commit & Push Fix
                              ↓
                        Merge to dev branch
```

## Configuration

### GitHub Actions Secrets

No secrets required for basic functionality. The workflow uses `GITHUB_TOKEN` which is automatically provided.

### Local Setup

1. **Enable Git Hooks:**
   ```bash
   chmod +x .git/hooks/post-merge
   ```

2. **Make Scripts Executable (Linux/Mac):**
   ```bash
   chmod +x scripts/auto-pull-build-watch.sh
   ```

## Monitoring

### GitHub Actions
- View in GitHub UI: Repository → Actions tab
- CLI: `gh run list`

### Local Builds
- Check `.git/hooks/post-merge` output in terminal
- Script output shows detailed progress

## Troubleshooting

### Hook Not Running
```bash
# Check if hook is executable
ls -l .git/hooks/post-merge

# Make executable if needed
chmod +x .git/hooks/post-merge
```

### Build Still Failing After Auto-Fix
1. Check error messages in output
2. Review changed files: `git diff`
3. Manual fixes may be required for complex issues
4. Commit fixes manually and push

### GitHub Actions Failing
```bash
# View detailed logs
gh run view <run-id> --log

# Re-run failed workflow
gh run rerun <run-id>
```

## Best Practices

1. **Always work on `ClaudeCode` branch** for automatic fixes
2. **Review auto-fix commits** before merging to ensure correctness
3. **Monitor GitHub Actions** for build status
4. **Test locally first** using the manual script
5. **Keep automation scripts updated** as project evolves

## Maintenance

### Update Auto-Fix Patterns

Edit these files to add new auto-fix patterns:
- `.github/workflows/auto-build-deploy.yml`
- `.git/hooks/post-merge`
- `scripts/auto-pull-build-watch.sh`
- `scripts/auto-pull-build-watch.bat`

### Disable Automation

**Git Hook:**
```bash
rm .git/hooks/post-merge
```

**GitHub Actions:**
- Delete `.github/workflows/auto-build-deploy.yml`
- Or disable in GitHub UI: Settings → Actions → Disable

## Support

For issues or improvements:
1. Check workflow logs: `gh run view <run-id> --log`
2. Review this documentation
3. Check git hook output in terminal
4. Review GitHub Actions tab for CI/CD status
