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
    address: {
      type: "TEXT",
      notNull: false,
    },
    no_telp: {
      type: "CHAR(15)",
      notNull: false,
    },
    gender: {
      type: "gender",
      notNull: false,
    },
    photo_profile: {
      type: "VARCHAR(200)",
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
  pgm.dropTable("user_profiles");
  pgm.dropType("gender");
};
