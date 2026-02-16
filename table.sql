CREATE TABLE IF NOT EXISTS users_list (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('NORMAL', 'ADMIN') NOT NULL 
);

CREATE TABLE IF NOT EXISTS recipes_list (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date DATE NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users_list(id),
    user_name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS followers_list (
    follower_id VARCHAR(64),
    FOREIGN KEY (follower_id) REFERENCES users_list(id),
    followed_id VARCHAR(64),
    FOREIGN KEY (followed_id) REFERENCES users_list(id)
);