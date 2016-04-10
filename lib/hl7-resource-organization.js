
// create the object using our BaseModel
Organization = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
Organization.prototype._collection = Organizations;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
Organizations = new Mongo.Collection('Organizations');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
Organizations._transform = function (document) {
  return new Organization(document);
};


if (Meteor.isClient){
  Meteor.subscribe("Organizations");
}

if (Meteor.isServer){
  Meteor.publish("Organizations", function (argument){
    if (this.userId) {
      return Organizations.find();
    } else {
      return [];
    }
  });
}



OrganizationSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "Organization"
  },
  "identifier" : {
    optional: true,
    type: [ IdentifierSchema ]
  }, // C? Identifies this organization  across multiple systems
  "active" : {
    optional: true,
    type: Boolean
  }, // Whether the organization's record is still in active use
  "type" : {
    optional: true,
    type: CodeableConceptSchema
  }, // Kind of organization
  "name" : {
    optional: true,
    type: String
  }, // C? Name used for the organization
  "telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
  }, // C? A contact detail for the organization
  "address" : {
    optional: true,
    type: [ AddressSchema ]
  }, // C? An address for the organization
  "partOf" : {
    optional: true,
    type: ReferenceSchema
  }, // (Organization) The organization of which this organization forms a part
  "contact.$.purpose" : {
    optional: true,
    type: CodeableConceptSchema
  }, // The type of contact
  "contact.$.name" : {
    optional: true,
    type: HumanNameSchema
  }, // A name associated with the contact
  "contact.$.telecom" : {
    optional: true,
    type: [ ContactPointSchema ]
  }, // Contact details (telephone, email, etc.)  for a contact
  "contact.$.address" : {
    optional: true,
    type: AddressSchema
  } // Visiting or postal addresses for the contact
});
Organizations.attachSchema(OrganizationSchema);
