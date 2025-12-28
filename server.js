import cds from '@sap/cds'
import cds_swagger from 'cds-swagger-ui-express'

cds.on('bootstrap', async (app) => {
  app.use(cds_swagger())
})

export default cds.server
