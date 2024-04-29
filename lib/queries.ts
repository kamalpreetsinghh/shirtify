const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    bio VARCHAR(500)
);`;

const createCustomizationsTable = `CREATE TABLE IF NOT EXISTS customizations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    logo_image VARCHAR(500),
    full_image VARCHAR(500),
    is_logo_image BOOLEAN,
    is_full_image BOOLEAN,
    color VARCHAR(10)
);`;

const createCustomizationQuery = `
    INSERT INTO customizations (user_id, logo_image, full_image, color) VALUES
`;
