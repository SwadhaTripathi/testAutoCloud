# Automation Scripts

Quick reference for automation scripts in this directory.

## Auto Pull, Build, Deploy and Watch

### Windows
```cmd
scripts\auto-pull-build-watch.bat
```

### Linux/Mac
```bash
./scripts/auto-pull-build-watch.sh
```

## What These Scripts Do

1. **Switch to ClaudeCode branch** (if not already on it)
2. **Pull latest changes** from `origin/ClaudeCode`
3. **Install dependencies** (`npm install`)
4. **Build the project** (`npm run build`)
5. **Auto-fix errors** if build fails
   - Converts CommonJS to ES modules
   - Fixes `require()` syntax
   - Updates `module.exports`
6. **Commit and push fixes** if auto-fix successful
7. **Deploy to database** (`cds deploy`)
8. **Start watch mode** (`cds watch`)
9. **Merge to dev** (via GitHub API) if fixes were applied

## When to Use

### Use Automatic (Git Hook)
```bash
git pull origin ClaudeCode
```
The post-merge hook will automatically run the build and deploy.

### Use Manual Script When
- You want to see detailed output
- You're starting fresh and want a full rebuild
- You want the watch mode to start automatically
- Git hooks are not working

## Troubleshooting

### Script Won't Execute (Linux/Mac)
```bash
chmod +x scripts/auto-pull-build-watch.sh
./scripts/auto-pull-build-watch.sh
```

### Build Still Failing
1. Check the error messages in the output
2. Review the files that were modified
3. Some errors may require manual fixes
4. Check `AUTOMATION.md` for more details

### Push Failed
- Ensure you have push permissions
- Check your git credentials
- Verify remote URL: `git remote -v`

## Environment Requirements

- **Node.js**: v18 or higher
- **npm**: v9 or higher
- **Git**: v2.30 or higher
- **GitHub CLI**: `gh` (for remote merges)
- **SAP CDS**: @sap/cds v9 or higher

## Advanced Usage

### Skip Watch Mode
Edit the script and comment out the last line:
```bash
# cds watch
```

### Custom Build Command
Edit the script and change:
```bash
npm run build
```
to your custom command.

### Disable Auto-Fix
Comment out the auto-fix section in the script (lines with `sed` or `powershell`).

## See Also

- [AUTOMATION.md](../AUTOMATION.md) - Comprehensive automation documentation
- [README.md](../README.md) - Project overview and setup
