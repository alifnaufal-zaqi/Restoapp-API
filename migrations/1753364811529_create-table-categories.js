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
  pgm.createType("category_name_enum", [
    "indonesian",
    "chinese",
    "japanese",
    "western",
    "middle_eastern",
    "vegetarian",
    "seafood",
    "halal",
    "vegan",
    "dessert",
  ]);

  pgm.createTable("categories", {
    id_category: {
      type: "VARCHAR(30)",
      primaryKey: true,
    },
    category_name: {
      type: "category_name_enum",
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
  pgm.dropTable("categories");
  pgm.dropType("category_name_enum");
};
