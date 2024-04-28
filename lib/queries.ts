const createUserTable = `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    avatar VARCHAR(500),
    bio VARCHAR(500)
);`;
