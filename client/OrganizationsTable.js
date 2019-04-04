import React from 'react';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import ReactMixin from 'react-mixin';
import { Table } from 'react-bootstrap';
import Toggle from 'material-ui/Toggle';
import { get, set } from 'lodash';
import { Glass } from 'meteor/clinical:glass-ui';
import PropTypes from 'prop-types';

Session.setDefault('selectedOrganizations', []);

export class OrganizationsTable extends React.Component {
  getMeteorData() {
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
        result.identifier = get(organization, 'identifier[0].value', '')
    

        //----------------------------------------------------------------
        // TODO REFACTOR:  ContactPoint
        // totally want to extract this

        let telecomArray = get(organization, 'telecom', []);
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

    if(process.env.NODE_ENV === "test") console.log("OrganizationsTable[data]", data);

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
  renderIdentifier(identifier){
    if (!this.props.hideIdentifier) {
      return (
        <td className="identifier hidden-on-phone">{ identifier }</td>
      );
    }
  }
  renderIdentifierHeader(){
    if (!this.props.hideIdentifier) {
      return (
        <th className="identifier hidden-on-phone">identifier</th>
      );
    }
  }
  renderPhone(phone){
    if (!this.props.hidePhone) {
      return (
        <td className="phone">{ phone }</td>
      );
    }
  }
  renderPhoneHeader(){
    if (!this.props.hidePhone) {
      return (
        <th className="phone">phone</th>
      );
    }
  }
  renderEmail(email){
    if (!this.props.hideEmail) {
      return (
        <td className="email hidden-on-phone">{ email }</td>
      );
    }
  }
  renderEmailHeader(){
    if (!this.props.hideEmail) {
      return (
        <th className="email hidden-on-phone">email</th>
      );
    }
  }
  renderCity(city){
    if (!this.props.hideCity) {
      return (
        <td className="city ">{ city }</td>
      );
    }
  }
  renderCityHeader(){
    if (!this.props.hideCity) {
      return (
        <th className="city">city</th>
      );
    }
  }
  renderState(state){
    if (!this.props.hideState) {
      return (
        <td className="state">{ state }</td>
      );
    }
  }
  renderStateHeader(){
    if (!this.props.hideState) {
      return (
        <th className="city">city</th>
      );
    }
  }
  renderPostalCode(postalCode){
    if (!this.props.hidePostalCode) {
      return (
        <td className="postalCode hidden-on-phone">{ postalCode }</td>
      );
    }
  }
  renderPostalCodeHeader(){
    if (!this.props.hidePostalCode) {
      return (
        <th className="postalCode hidden-on-phone">postalCode</th>
      );
    }
  }
  
  render () {
    let tableRows = [];
    for (var i = 0; i < this.data.organizations.length; i++) {
      tableRows.push(
      <tr className='organizationRow' ref='med-{i}' key={i} style={{cursor: 'pointer'}} onClick={ this.rowClick.bind('this', this.data.organizations[i]._id) }>
        <td className="name">{this.data.organizations[i].name}</td>
        {this.renderIdentifier(this.data.organizations[i].identifier)}
        {this.renderPhone(this.data.organizations[i].phone)}
        {this.renderEmail(this.data.organizations[i].email)}
        {this.renderCity(this.data.organizations[i].city)}
        {this.renderState(this.data.organizations[i].state)}
        {this.renderPostalCode(this.data.organizations[i].postalCode)}
      </tr>);
    }


    return(
      <Table id="organizationsTable" ref='organizationsTable' hover >
        <thead>
          <tr>
            <th className="name">name</th>
            {this.renderIdentifierHeader() }
            {this.renderPhoneHeader() }
            {this.renderEmailHeader() }
            {this.renderCityHeader() }
            {this.renderStateHeader() }
            {this.renderPostalCodeHeader() }
          </tr>
        </thead>
        <tbody>
          { tableRows }
        </tbody>
      </Table>
    );
  }
}

OrganizationsTable.propTypes = {
  id: PropTypes.string,
  fhirVersion: PropTypes.string,
  hideIdentifier: PropTypes.bool,
  hidePhone: PropTypes.bool,
  hideEmail: PropTypes.bool,
  hideCity: PropTypes.bool,
  hideState: PropTypes.bool,
  hidePostalCode: PropTypes.bool
};
ReactMixin(OrganizationsTable.prototype, ReactMeteorData);
export default OrganizationsTable;