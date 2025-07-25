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
  pgm.createTable("restaurants", {
    id_restaurant: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    restaurant_name: {
      type: "VARCHAR(160)",
      notNull: true,
    },
    latitude: {
      type: "DECIMAL(10, 8)",
      notNull: true,
    },
    longitude: {
      type: "DECIMAL(11, 8)",
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
  pgm.dropTable("restaurants");
};
