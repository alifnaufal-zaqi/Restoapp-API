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
  pgm.createType("payment_status_enum", ["paid", "pending", "cancelled"]);

  pgm.createTable("payment_status", {
    id_status: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    status_name: {
      type: "payment_status_enum",
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
  pgm.dropTable("payment_status");
  pgm.dropType("payment_status_enum");
};
