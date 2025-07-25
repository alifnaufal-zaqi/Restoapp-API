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
  const payment_methods = [
    "cash",
    "debit_card",
    "credit_card",
    "qris",
    "e_wallet",
    "bank_transfer",
  ];
  const values = payment_methods
    .map((method, index) => `('method-${index + 1}', '${method}')`)
    .join(", ");

  pgm.sql(
    `INSERT INTO payment_methods (id_payment_method, method_name) VALUES ${values}`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql("DELETE FROM payment_methods");
};
