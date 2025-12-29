# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a SAP Cloud Application Programming (CAP) model project implementing a bookshop application with automated CI/CD workflows. The project uses ES modules (`"type": "module"` in package.json) and includes comprehensive automation for building, deploying, and fixing common issues.

## Commands

### Development
- `cds watch` - Start development server with hot reload (default port: 4004)
- `npm run run` - Run with development profile
- `npm start` - Start server using cds-serve

### Build & Deploy
- `npm run build` - Build for both development and production
- `npm run deploy` - Deploy to SQLite database
- `npx cds build --production` - Production build only

### CI/CD
The project includes automated GitHub Actions workflow on the `ClaudeCode` branch that:
- Triggers only on code file changes (srv/, db/, app/, package.json, mta.yaml, server.js)
- Skips if same user pushes twice consecutively (prevents infinite loops)
- Auto-fixes ES module syntax issues
- Merges to `dev` branch on success

## Architecture

### Core Structure
- **db/** - Domain models and data
  - `schema.cds` - Main data model (Books, Authors, Genres)
  - `currencies.cds` - Currency definitions
  - `data/` - CSV seed data
  - `hana/`, `sqlite/` - Database-specific configurations

- **srv/** - Service layer
  - `admin-service.cds` - Administrative service (Authors, Books, Genres projections)
  - `admin-service.js` - AdminService implementation with draft ID generation
  - `cat-service.cds` - CatalogService with readonly projections
  - `cat-service.js` - CatalogService implementation with submitOrder action
  - `access-control.cds` - Authorization annotations

- **app/** - UI applications
  - Multiple Fiori apps (admin-authors, admin-books, browse, genres)
  - `common.cds` - Shared UI annotations
  - `services.cds` - UI service aggregation
  - `router/` - Application router for SAP BTP

### Service Layer Implementation

Both service implementations use ES module syntax and extend `cds.ApplicationService`:

```javascript
import cds from '@sap/cds'

export default class AdminService extends cds.ApplicationService {
  async init() {
    // Custom logic here
    return super.init()
  }
}
```

**AdminService** (srv/admin-service.js:11-16):
- Implements auto-ID generation for Books drafts using `before('NEW', Books.drafts)`
- Finds max ID from both Books and Books.drafts tables

**CatalogService** (srv/cat-service.js:3-38):
- Adds discount labels to overstocked books (stock > 111) in `after('each', ListOfBooks)`
- Implements `submitOrder` action with stock validation and reduction
- Emits `OrderedBook` event after successful order

### Module System

The project uses ES modules throughout:
- `package.json` has `"type": "module"`
- All .js files use `import`/`export` syntax
- `jsconfig.json` configured with `"module": "NodeNext"` and `"moduleResolution": "NodeNext"`
- Path aliases: `#cds-models/*` maps to `./@cds-models/*`

**Important**: When modifying service implementations, always use ES module syntax:
- Use `import cds from '@sap/cds'` not `const cds = require('@sap/cds')`
- Use `export default class` not `module.exports = class`

### Integrations

**Swagger UI**: Configured in server.js using cds-swagger-ui-express
```javascript
import cds_swagger from 'cds-swagger-ui-express'
cds.on('bootstrap', async (app) => {
  app.use(cds_swagger())
})
```

**SAP BTP Services** (configured in package.json cds.requires):
- Destinations service enabled
- Connectivity service enabled
- Protocol: REST API at `/rest`
- OpenAPI: Swagger UI at `/swagger`

**Multi-Target Application**: mta.yaml defines deployment structure:
- `testAutoCloud-srv` - Node.js service module (gen/srv)
- `testAutoCloud` - Application router (app/router)
- Resources: destination (lite), connectivity (lite)

### Data Model

**Namespace**: `sap.capire.bookshop`

**Entities**:
- `Books` - ID, title, descr, author (Association), genre (Association), stock, price, currency
  - Annotated with `@fiori.draft.enabled` for draft support
  - Uses localized strings for title/descr
- `Authors` - ID, name, dateOfBirth, dateOfDeath, placeOfBirth, placeOfDeath, books (Association to many)
- `Genres` - Hierarchical code list with parent/children relationships

## Development Notes

### ES Module Migration
The GitHub Actions workflow includes auto-fix logic for ES module syntax errors. If you see require() syntax in service files, it will be automatically converted to import/export.

### Draft Handling
AdminService generates sequential IDs for new Books drafts by finding the max ID across both Books and Books.drafts tables (srv/admin-service.js:11-16).

### Stock Management
CatalogService's submitOrder action validates stock availability and reduces inventory atomically (srv/cat-service.js:15-27). It also emits an OrderedBook event for downstream processing.

### Automation Safeguards
- GitHub Actions only runs when different users push (prevents bot loops)
- Workflow only triggers on code file changes (ignores README/docs)
- Local git hooks detect code vs documentation changes
- Auto-fix scripts handle common ES module and deployment issues

## Testing

HTTP test files available in `test/http/`:
- `AdminService.http` - Tests for admin operations
- `CatalogService.http` - Tests for catalog and order operations

## Service Endpoints

Once running (default port 4004):
- OData AdminService: `/odata/v4/admin`
- OData CatalogService: `/odata/v4/catalog`
- REST API: `/rest`
- Swagger UI: `/swagger`
- Fiori apps: `/` (landing page)
