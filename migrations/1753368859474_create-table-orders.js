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
  pgm.createTable("orders", {
    id_order: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    id_user: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"users"(id_user)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    created_at: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    order_date: {
      type: "TIMESTAMP",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    total_amount: {
      type: "INTEGER",
      notNull: true,
    },
    id_payment_method: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"payment_methods"(id_payment_method)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_status: {
      type: "VARCHAR(30)",
      notNull: true,
      references: `"payment_status"(id_status)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  });
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("orders");
};
