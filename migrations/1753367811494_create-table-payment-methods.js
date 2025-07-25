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
  pgm.createType("payment_method", [
    "cash",
    "debit_card",
    "credit_card",
    "qris",
    "e_wallet",
    "bank_transfer",
  ]);

  pgm.createTable("payment_methods", {
    id_payment_method: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    method_name: {
      type: "payment_method",
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
  pgm.dropTable("payment_methods");
  pgm.dropType("payment_method");
};
