/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: "mysql2",
	connection: {
		host: "127.0.0.1",
		port: "3306",
		user: "root",
		password: "245524",
		database: "commerceapi",
	},
};
