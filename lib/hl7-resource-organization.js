
Organizations = new Meteor.Collection('organizations');

if (Meteor.isClient){
  Meteor.subscribe('organizations');
}



OrganizationSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Organization"
    }
});
Organizations.attachSchema(OrganizationSchema);
