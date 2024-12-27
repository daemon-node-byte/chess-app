-- Step 1: Add the `username` column to the `chat` table
ALTER TABLE chat
ADD COLUMN username TEXT;

-- Step 2: Populate the `username` column with existing data
UPDATE chat
SET username = users.username
FROM users
WHERE chat.user_id = users.id;

-- Step 3: Create a trigger function to auto-fill `username` on new inserts
CREATE OR REPLACE FUNCTION fill_username()
RETURNS TRIGGER AS $$
BEGIN
  NEW.username := (SELECT username FROM users WHERE id = NEW.user_id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Step 4: Attach the trigger function to the `chat` table
DROP TRIGGER IF EXISTS auto_fill_username ON chat;
CREATE TRIGGER auto_fill_username
BEFORE INSERT OR UPDATE OF user_id
ON chat
FOR EACH ROW
EXECUTE FUNCTION fill_username();
