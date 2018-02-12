

import OrganizationsPage from './client/OrganizationsPage';
import OrganizationsTable from './client/OrganizationsTable';
import { Organization, Organizations, OrganizationSchema } from './lib/Organizations';

var DynamicRoutes = [{
  'name': 'OrganizationsPage',
  'path': '/organizations',
  'component': OrganizationsPage,
  'requireAuth': true
}];

var SidebarElements = [{
  'primaryText': 'Organizations',
  'to': '/organizations',
  'href': '/organizations'
}];

export { 
  SidebarElements, 
  DynamicRoutes, 

  OrganizationsPage,
  OrganizationsTable,

  Organization,
  Organizations,
  OrganizationSchema
};


