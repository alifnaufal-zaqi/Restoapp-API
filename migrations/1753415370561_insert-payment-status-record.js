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
  const payment_status = ["paid", "pending", "cancelled"];
  const values = payment_status
    .map((status, index) => `('status-${index + 1}', '${status}')`)
    .join(", ");

  pgm.sql(
    `INSERT INTO payment_status (id_status, status_name) VALUES ${values}`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql("DELETE FROM payment_status");
};
