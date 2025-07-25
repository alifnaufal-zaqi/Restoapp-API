/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("menus", {
    id_menu: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    id_category: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"categories"(id_category)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_restaurant: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"restaurants"(id_restaurant)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    menu_name: {
      type: "VARCHAR(160)",
      notNull: true,
    },
    price: {
      type: "INTEGER",
      notNull: true,
    },
    stock: {
      type: "INTEGER",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    image: {
      type: "VARCHAR(200)",
      notNull: true,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("menus");
};
