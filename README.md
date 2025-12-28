# Getting Started

Welcome to your new project.

It contains these folders and files, following our recommended project layout:

File or Folder | Purpose
---------|----------
`app/` | content for UI frontends goes here
`db/` | your domain models and data go here
`srv/` | your service models and code go here
`package.json` | project metadata and configuration
`readme.md` | this getting started guide


## Next Steps

- Open a new terminal and run `cds watch`
- (in VS Code simply choose _**Terminal** > Run Task > cds watch_)
- Start adding content, for example, a [db/schema.cds](db/schema.cds).

## Available Endpoints

Once the server is running, you can access the following endpoints:

### Main Application
- **Base URL**: http://localhost:4004

### OData Services
- **AdminService**: http://localhost:4004/odata/v4/admin
- **CatalogService**: http://localhost:4004/odata/v4/catalog

### API Documentation
- **Swagger UI**: Available via cds-swagger-ui-express integration (access through main application)

### REST API
- **REST Endpoint**: http://localhost:4004/rest

### Testing
- HTTP test files are available in `test/http/`:
  - `AdminService.http`
  - `CatalogService.http`

## Features

This project includes:
- **OpenAPI/Swagger UI** - API documentation and testing interface
- **Destination Support** - Integration with SAP BTP destinations
- **Connectivity Support** - SAP BTP connectivity service integration
- **HTTP Tests** - Ready-to-use HTTP test files for services
- **Automated CI/CD** - GitHub Actions workflow for build, deploy, and auto-fix
- **Git Hooks** - Local automation for pull, build, and deploy
- **Auto-Fix Scripts** - Automatically fixes common build errors

## Automation

This project includes comprehensive automation for continuous integration and deployment:

### Automation Status

**Trigger Conditions:**
- ✅ **Code Changes Only** - Triggers only when code files change (`.js`, `.cds`, `.json`, `.yaml`, `.yml`, `srv/`, `db/`, `app/`)
- ✅ **Different User Detection** - GitHub Actions runs only when a different user pushes (prevents loops)
- ✅ **Smart Skip** - Automatically skips builds for documentation/README changes
- ✅ **Safe from Infinite Loops** - Multiple safeguards prevent recursive triggers

### GitHub Actions
**Status:** 🟢 Active
**Triggers:** Push to `ClaudeCode` branch (code files only, different user)
**Actions:**
- Detects if same user pushed twice in a row (skips if true)
- Builds and deploys the project
- Auto-fixes common errors
- Commits fixes with bot identity
- Merges to `dev` branch on success

**Monitored Files:**
- `srv/**` - Service implementations
- `db/**` - Database schemas
- `app/**/*.cds`, `app/**/*.js` - Application code
- `package.json`, `package-lock.json` - Dependencies
- `mta.yaml`, `server.js` - Configuration

### Local Git Hooks
**Status:** 🟢 Active
**Triggers:** After `git pull` (code changes only)
**Actions:**
- Detects code vs documentation changes
- Skips build if only docs/README changed
- Builds and deploys locally
- Auto-fixes errors
- Commits and pushes fixes

### Manual Scripts
**Status:** 🟢 Ready
Run manually when needed:
- **Windows**: `scripts\auto-pull-build-watch.bat`
- **Linux/Mac**: `./scripts/auto-pull-build-watch.sh`

**Features:**
- Pre-pull change detection
- Smart code vs docs differentiation
- Full build, deploy, and watch cycle

For detailed automation documentation, see [AUTOMATION.md](AUTOMATION.md)

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
