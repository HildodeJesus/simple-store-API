/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("categories", table => {
		table.string("id").primary().notNullable();
		table.string("name").notNullable();
		table.string("img");
		table.string("createdAt").notNullable();
		table.string("updatedAt").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("categories");
};
