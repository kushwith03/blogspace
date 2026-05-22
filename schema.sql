-- Enable UUID support
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE blogs (
    id UUID PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW()
);
