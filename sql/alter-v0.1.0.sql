-- Rename the table
ALTER TABLE users RENAME TO user_profiles;

-- Update any indexes referencing the old table
ALTER INDEX idx_users_status RENAME TO idx_user_profiles_status;

-- Update unique constraint for username
ALTER TABLE user_profiles RENAME CONSTRAINT unique_username TO unique_user_profiles_username;