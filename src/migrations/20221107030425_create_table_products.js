/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.createTable("products", table => {
		table.string("id").primary().notNullable();
		table.string("name").notNullable();
		table.binary("description").notNullable();
		table.decimal("salePrice").notNullable();
		table.decimal("purchasePrice").notNullable();
		table.string("imgDefault").defaultTo(null);
		table.text("options").notNullable();
		table.integer("stock").notNullable();
		table.string("categoryId").references("id").inTable("categories");
		table.string("createdAt").notNullable();
		table.string("updatedAt").notNullable();
	});
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.dropTable("products");
};
