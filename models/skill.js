const { Text, Relationship } = require('@keystonejs/fields');

module.exports = {
    fields: {
        user_id: {
            type: Relationship,
            ref: 'User'
        },
        js: {
            type: Text,
        },
        java: {
            type: Text,
        },
        python: {
            type: Text,
        },
        redux: {
            type: Text,
        },
        node: {
            type: Text,
        },
        react: {
            type: Text,
        },
        mobx: {
            type: Text,
        },
        express: {
            type: Text,
        },
    },
    // List-level access controls
    access: {
        update: access.userIsAdmin,
        delete: access.userIsAdmin,
    },
    // Admin configs
      adminConfig: {
        defaultColumns: 'js,react,node,express',
        defaultPageSize: 80,
        defaultSort: 'email',
        maximumPageSize: 100,
      },
}