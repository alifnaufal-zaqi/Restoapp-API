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
  pgm.createType("user_role_enum", ["admin", "vendor", "user"]);

  pgm.createTable("users", {
    id_user: {
      type: "VARCHAR(60)",
      primaryKey: true,
    },
    username: {
      type: "VARCHAR(160)",
      notNull: true,
    },
    password: {
      type: "VARCHAR(160)",
      notNull: true,
    },
    created_at: {
      type: "TIMESTAMP",
      default: pgm.func("current_timestamp"),
      notNull: true,
    },
    role: {
      type: "user_role_enum",
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
  pgm.dropTable("users");
  pgm.dropType("user_role_enum");
};
