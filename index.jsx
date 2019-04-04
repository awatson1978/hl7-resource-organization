

import OrganizationsPage from './client/OrganizationsPage';
import OrganizationTable from './client/OrganizationTable';
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
  OrganizationTable
};


