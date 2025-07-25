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
  const categories = [
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
  ];
  const values = categories
    .map((cat, index) => `('category-${index + 1}', '${cat}')`)
    .join(", ");

  pgm.sql(
    `INSERT INTO categories (id_category, category_name) VALUES ${values}`
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql("DELETE FROM categories");
};
