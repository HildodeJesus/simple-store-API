/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("recovery_password", table => {
		table.string("id").primary().notNullable();
		table.number("exp").notNullable();
		table.string("userId").references("id").inTable("users").notNullable();
		table.string("createdAt").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("recovery_password");
};
