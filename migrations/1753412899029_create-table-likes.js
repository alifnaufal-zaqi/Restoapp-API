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
  pgm.createTable("likes", {
    id_like: {
      type: "VARCHAR(60)",
      primaryKey: true,
    },
    id_user: {
      type: "VARCHAR(60)",
      notNull: true,
      references: `"users"(id_user)`,
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    id_menu: {
      type: "VARCHAR(60)",
      notNull: true,
      references: `"menus"(id_menu)`,
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
  pgm.dropTable("likes");
};
