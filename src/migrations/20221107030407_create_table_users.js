/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("users", table => {
		table.string("id", 200).notNullable().primary();
		table.string("first_name", 255).notNullable();
		table.string("last_name", 255).notNullable();
		table.string("email", 255).notNullable().unique();
		table.string("password").notNullable();
		table.integer("role").defaultTo(0).notNullable();
		table.string("createdAt").notNullable();
		table.string("updatedAt").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("users");
};
