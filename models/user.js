const { Text, Checkbox, Password } = require('@keystonejs/fields');

const access = require('../utils/access');

module.exports = {
  fields: {
    firstName: { 
      type: Text,
      isRequired: true,
      update: access.userHaveAccess,
    },
    lastName: { 
      type: Text,
      isRequired: true,
      update: access.userHaveAccess,
    },
    email: {
      type: Text,
      isRequired: true,
      isUnique: true,
      update: access.userHaveAccess,
    },
    isAdmin: {
      type: Checkbox,
      defaultValue: false,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      access: {
        update: access.userIsAdmin,
      },
    },
    password: {
      isRequired: true,
      type: Password,
      update: access.userHaveAccess,
    },
  },
  // List-level access controls
  access: {
    read: access.userIsAdminOrOwner,
    create: access.userIsAdmin,
    delete: access.userIsAdmin,
    auth: true,
  },
  // Admin configs
  adminConfig: {
    defaultColumns: 'firstName,lastName,email,isAdmin',
    defaultPageSize: 80,
    defaultSort: 'email',
    maximumPageSize: 100,
  },
}