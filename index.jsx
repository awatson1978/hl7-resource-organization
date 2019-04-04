

import OrganizationsPage from './client/OrganizationsPage';
import OrganizationsTable from './client/OrganizationsTable';

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
  OrganizationsTable
};


