INSERT INTO users (id, username, status)
VALUES
    (gen_random_uuid(), 'Alice', 'online'),
    (gen_random_uuid(), 'Bob', 'online'),
    (gen_random_uuid(), 'Charlie', 'offline'),
    (gen_random_uuid(), 'Diana', 'online'),
    (gen_random_uuid(), 'Eve', 'offline');

INSERT INTO lobby (id, name)
VALUES
    (gen_random_uuid(), 'Main Lobby'),
    (gen_random_uuid(), 'Casual Games'),
    (gen_random_uuid(), 'Ranked Games');

INSERT INTO games (id, host_user, opponent_user, status)
VALUES
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Alice'), NULL, 'open'),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Bob'), (SELECT id FROM users WHERE username = 'Diana'), 'in_progress'),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Charlie'), (SELECT id FROM users WHERE username = 'Eve'), 'completed');

INSERT INTO chat (id, user_id, message, lobby_id)
VALUES
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Alice'), 'Hi everyone!', (SELECT id FROM lobby WHERE name = 'Main Lobby')),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Bob'), 'Hello Alice!', (SELECT id FROM lobby WHERE name = 'Main Lobby')),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Charlie'), 'Is anyone here?', (SELECT id FROM lobby WHERE name = 'Casual Games')),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Diana'), 'Ready for a game?', (SELECT id FROM lobby WHERE name = 'Ranked Games'));

INSERT INTO chat (id, user_id, message, game_id)
VALUES
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Bob'), 'Good luck!', (SELECT id FROM games WHERE host_user = (SELECT id FROM users WHERE username = 'Bob'))),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Diana'), 'Thanks! You too!', (SELECT id FROM games WHERE host_user = (SELECT id FROM users WHERE username = 'Bob'))),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Charlie'), 'That was a close one!', (SELECT id FROM games WHERE host_user = (SELECT id FROM users WHERE username = 'Charlie'))),
    (gen_random_uuid(), (SELECT id FROM users WHERE username = 'Eve'), 'Yeah, great game!', (SELECT id FROM games WHERE host_user = (SELECT id FROM users WHERE username = 'Charlie')));

