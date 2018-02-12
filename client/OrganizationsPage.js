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
Session.setDefault('selectedOrganization', false);


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
      currentOrganization: Session.get('selectedOrganization')
    };

    if (Meteor.user()) {
      data.state.isLoggedIn = true;
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
    Session.set('selectedOrganization', false);
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
                  <OrganizationDetail id='newOrganization' />
                </Tab>
                <Tab className="organizationListTab" label='Organizations' onActive={this.handleActive} style={this.data.style.tab} value={1}>
                  <OrganizationTable />
                </Tab>
                <Tab className="organizationDetailsTab" label='Detail' onActive={this.handleActive} style={this.data.style.tab} value={2}>
                  <OrganizationDetail id='organizationDetails' />
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