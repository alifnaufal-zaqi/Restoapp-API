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
  pgm.createTable("order_items", {
    id_order_item: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    id_order: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"orders"(id_order)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_menu: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"menus"(id_menu)`,
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
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    quantity: {
      type: "INTEGER",
      notNull: true,
    },
    price: {
      type: "INTEGER",
      notNull: true,
    },
    subtotal: {
      type: "INTEGER",
      notNull: true,
    },
    note: {
      type: "TEXT",
      notNull: false,
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("order_items");
};
