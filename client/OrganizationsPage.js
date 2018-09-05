import { CardText, CardTitle } from 'material-ui/Card';
import { Tab, Tabs } from 'material-ui/Tabs';
import { GlassCard, VerticalCanvas, Glass } from 'meteor/clinical:glass-ui';

import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import OrganizationDetail from './OrganizationDetail';
import OrganizationTable from './OrganizationsTable';
import React  from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin  from 'react-mixin';


Session.setDefault('organizationPageTabIndex', 1); 
Session.setDefault('organizationSearchFilter', ''); 
Session.setDefault('selectedOrganizationId', false);
Session.setDefault('fhirVersion', 'v1.0.2');

export class OrganizationsPage extends React.Component {
  getMeteorData() {
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        tab: {
          borderBottom: '1px solid lightgray',
          borderRight: 'none'
        }
      },
      state: {
        isLoggedIn: false
      },
      tabIndex: Session.get('organizationPageTabIndex'),
      organizationSearchFilter: Session.get('organizationSearchFilter'),
      selectedOrganizationId: Session.get('selectedOrganizationId'),
      fhirVersion: Session.get('fhirVersion'),
      selectedOrganization: false
    };

    if (Session.get('selectedOrganizationId')){
      data.selectedOrganization = Organizations.findOne({_id: Session.get('selectedOrganizationId')});
    } else {
      data.selectedDevice = false;
    }

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("OrganizationsPage[data]", data);
    return data;
  }

  handleTabChange(index){
    Session.set('organizationPageTabIndex', index);
  }

  onNewTab(){
    Session.set('selectedOrganizationId', false);
    Session.set('organizationUpsert', false);
  }

  render() {
    return (
      <div id="organizationsPage"> <VerticalCanvas>
          <GlassCard height='auto'>
            <CardTitle
              title="Organizations"
            />
            <CardText>
              <Tabs id="organizationsPageTabs" default value={this.data.tabIndex} onChange={this.handleTabChange} initialSelectedIndex={1}> 
                <Tab className="newOrganizationTab" label='New' style={this.data.style.tab} onActive={ this.onNewTab } value={0} >
                  <OrganizationDetail 
                    id='newOrganization' />
                </Tab>
                <Tab className="organizationListTab" label='Organizations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <OrganizationTable />
                </Tab>
                <Tab className="organizationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <OrganizationDetail 
                    id='organizationDetails' 
                    organization={ this.data.selectedOrganization }
                    organizationId={ this.data.selectedOrganizationId } />  
                </Tab>
              </Tabs>
            </CardText>
          </GlassCard>
        </VerticalCanvas>
      </div>
    );
  }
}

ReactMixin(OrganizationsPage.prototype, ReactMeteorData);
export default OrganizationsPage;