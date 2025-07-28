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
  pgm.sql('CREATE EXTENSION IF NOT EXISTS "pgcrypto"');

  pgm.sql(`
            CREATE FUNCTION add_user_profile()
            RETURNS TRIGGER AS $$
            BEGIN
            INSERT INTO user_profiles VALUES (gen_random_uuid(), NEW.id_user, NULL, NULL, NULL, NULL);
            RETURN NEW;
            END;
            $$ LANGUAGE plpgsql;
        `);

  pgm.sql(`
            CREATE TRIGGER add_user_profile_trigger AFTER INSERT ON users
            FOR EACH ROW
            EXECUTE FUNCTION add_user_profile();
        `);
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.sql("DROP TRIGGER IF EXISTS add_user_profile_trigger ON users");
  pgm.sql("DROP FUNCTION IF EXISTS add_user_profile");
};
