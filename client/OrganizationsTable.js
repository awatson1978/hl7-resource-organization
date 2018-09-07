import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import { get, set } from 'lodash';
import { Glass } from 'meteor/clinical:glass-ui';

Session.setDefault('selectedOrganizations', []);

export default class OrganizationTable extends React.Component {
  getMeteorData() {

    // this should all be handled by props
    // or a mixin!
    let data = {
      style: {
        opacity: Session.get('globalOpacity'),
        text: Glass.darkroom(),
        block: {
          maxWidth: 250
        }
      },
      selected: [],
      organizations: Organizations.find().map(function(organization){
        let result = {
          _id: '',
          name: '',
          identifier: '',
          phone: '',
          email: '',
          text: '',
          city: '',
          state: '',
          postalCode: ''
        };

        result._id = get(organization, '_id');
        result.name = get(organization, 'name')
        result.identifier = get(organization, 'identifier[0].value')
    

        //----------------------------------------------------------------
        // TODO REFACTOR:  ContactPoint
        // totally want to extract this

        let telecomArray = get(organization, 'telecom');
        telecomArray.forEach(function(telecomRecord){
          if(get(telecomRecord, 'system') === 'phone'){
            result.phone = get(telecomRecord, 'value');
          }
          if(get(telecomRecord, 'system') === 'email'){
            result.email = get(telecomRecord, 'value');
          }
        })

        //----------------------------------------------------------------
    
        result.text = get(organization, 'address[0].text')
        result.city = get(organization, 'address[0].city')
        result.state = get(organization, 'address[0].state')
        result.postalCode = get(organization, 'address[0].postalCode')


        return result;
      })
    };

    data.style = Glass.blur(data.style);
    data.style.appbar = Glass.darkroom(data.style.appbar);
    data.style.tab = Glass.darkroom(data.style.tab);

    if(process.env.NODE_ENV === "test") console.log("OrganizationTable[data]", data);

    return data;
  }
  handleChange(row, key, value) {
    const source = this.state.source;
    source[row][key] = value;
    this.setState({source});
  }

  handleSelect(selected) {
    this.setState({selected});
  }

  rowClick(id){
    Session.set('organizationUpsert', false);
    Session.set('selectedOrganizationId', id);
    Session.set('organizationPageTabIndex', 2);
  }
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.organizations.length; i++) {
      tableRows.push(
      <tr className='organizationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.organizations[i]._id) }>
        <td className="name">{this.data.organizations[i].name}</td>
        <td className="identifier hidden-on-phone">{ this.data.organizations[i].identifier  }</td>
        <td className="phone">{this.data.organizations[i].phone}</td>
        <td className="email hidden-on-phone">{this.data.organizations[i].email}</td>
        <td className="city ">{this.data.organizations[i].city}</td>
        <td className="state">{this.data.organizations[i].state}</td>
        <td className="postalCode hidden-on-phone">{this.data.organizations[i].postalCode}</td>
      </tr>);
    }


    return(
      <Table id="organizationsTable" ref='organizationsTable' hover >
        <thead>
          <tr>
            <th className="name">name</th>
            <th className="identifier hidden-on-phone">identifier</th>
            <th className="phone">phone</th>
            <th className="email hidden-on-phone">email</th>
            <th className="city">city</th>
            <th className="state">state</th>
            <th className="postalCode hidden-on-phone">postalCode</th>
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}


ReactMixin(OrganizationTable.prototype, ReactMeteorData);
