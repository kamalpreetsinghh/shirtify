const createUsersTable = `CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(255),
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
    color VARCHAR(10),
    FOREIGN KEY (user_id) REFERENCES users(id) 
);`;

const createUserFollowTable = `CREATE TABLE IF NOT EXISTS user_following (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    follower_id VARCHAR(255) NOT NULL,
    followee_id VARCHAR(255) NOT NULL,
    follow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES users(id),
    FOREIGN KEY (followee_id) REFERENCES users(id)
);`;
