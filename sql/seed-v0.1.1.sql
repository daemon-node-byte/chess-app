

-- Insert mock data into user_profiles table
INSERT INTO user_profiles (id, username, status, created_at)
VALUES
    (gen_random_uuid(), 'Alice', 'online', NOW()),
    (gen_random_uuid(), 'Bob', 'offline', NOW()),
    (gen_random_uuid(), 'Charlie', 'online', NOW()),
    (gen_random_uuid(), 'Diana', 'offline', NOW()),
    (gen_random_uuid(), 'Eve', 'online', NOW()),
    (gen_random_uuid(), 'Frank', 'online', NOW()),
    (gen_random_uuid(), 'Grace', 'offline', NOW()),
    (gen_random_uuid(), 'Hank', 'online', NOW()),
    (gen_random_uuid(), 'Ivy', 'offline', NOW()),
    (gen_random_uuid(), 'John', 'online', NOW());

-- Seed chat messages linked to lobbies
INSERT INTO chat (id, user_id, message, created_at, lobby_id)
VALUES
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Alice'), 'Hello everyone!', NOW(), (SELECT id FROM lobby LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Bob'), 'Hi Alice!', NOW(), (SELECT id FROM lobby LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Charlie'), 'Anyone up for a game?', NOW(), (SELECT id FROM lobby LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Diana'), 'Good morning!', NOW(), (SELECT id FROM lobby LIMIT 1));

-- Seed chat messages linked to games
INSERT INTO chat (id, user_id, message, created_at, game_id)
VALUES
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Alice'), 'Good luck!', NOW(), (SELECT id FROM games LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Bob'), 'Thanks! Lets play!', NOW(), (SELECT id FROM games LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Charlie'), 'That was a close one!', NOW(), (SELECT id FROM games LIMIT 1)),
    (gen_random_uuid(), (SELECT id FROM user_profiles WHERE username = 'Eve'), 'Yeah, great game!', NOW(), (SELECT id FROM games LIMIT 1));

ALTER TABLE chat
DROP CONSTRAINT chat_user_id_fkey,
ADD CONSTRAINT chat_user_id_fkey FOREIGN KEY (user_id) REFERENCES user_profiles (id) ON DELETE CASCADE;