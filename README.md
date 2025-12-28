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

## Learn More

Learn more at https://cap.cloud.sap/docs/get-started/.
