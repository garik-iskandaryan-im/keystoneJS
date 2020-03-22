
// Access control functions
const userIsAdmin = ({ authentication: { item: user } }) => Boolean(user && user.isAdmin);

const userHaveAccess = ({ existingItem, authentication }) =>
	authentication.item.isAdmin
	|| existingItem.id === authentication.item.id;

const access = { userIsAdmin, userHaveAccess };

module.exports = access;