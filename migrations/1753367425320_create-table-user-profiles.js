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
  pgm.createType("gender", ["male", "female"]);

  pgm.createTable("user_profiles", {
    id_profile: {
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
    address: {
      type: "TEXT",
      notNull: true,
    },
    no_telp: {
      type: "CHAR(15)",
      notNull: true,
    },
    gender: {
      type: "gender",
      notNull: true,
    },
    photo_profile: {
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
  pgm.dropTable("user_profiles");
  pgm.dropType("gender");
};
