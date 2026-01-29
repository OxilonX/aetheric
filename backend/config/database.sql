CREATE DATABASE aetheric;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    profile_pic TEXT NOT NULL DEFAULT("/uploads/default_profile_pic.png")
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE refresh_tokens (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    token TEXT NOT NULL,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);