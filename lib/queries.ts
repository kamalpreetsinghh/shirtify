const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
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

const selectCustomizations = `SELECT 
customizations.id AS customization_id,
customizations.logo_image,
customizations.full_image,
customizations.is_logo_image,
customizations.is_full_image,
customizations.color,
users.id AS user_id,
users.first_name,
users.last_name,
users.avatar,
users.bio
FROM customizations  
JOIN users ON customizations.user_id = users.id
LIMIT 9 OFFSET 1
`;
