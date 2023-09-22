/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("user_id").primary().unsigned();
    table.string("fullname", 50).notNullable();
    table.string("email", 50).unique().index();
    table.string("password", 20).notNullable();
    table.string("phone", 15);
    table.boolean("is_active").defaultTo(false);
    table.integer("role_id").notNullable().defaultTo(0);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
    // table.foreign("role_id").references("role_id").inTable("roles");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
