// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
	client: "mysql2",
	connection: {
		host: process.env.KNEX_HOST,
		port: process.env.KNEX_PORT,
		user: process.env.KNEX_USER,
		password: process.env.KNEX_PASSWORD,
		database: process.env.KNEX_DATABASE,
	},
};
