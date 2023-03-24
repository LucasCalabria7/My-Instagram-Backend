-- Active: 1679694456071@@127.0.0.1@3306
CREATE TABLE
    users(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL
    );

CREATE TABLE
    posts(
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        creator_id TEXT NOT NULL,
        content TEXT NOT NULL,
        likes INTEGER NOT NULL,
        dislikes INTEGER NOT NULL,
        created_at TEXT DEFAULT (DATETIME()) NOT NULL,
        updated_at TEXT DEFAULT(DATETIME()) NOT NULL,
        FOREIGN KEY (creator_id) REFERENCES users(id)
    );

CREATE TABLE
    likes_dislikes(
        user_id TEXT NOT NULL,
        post_id TEXT NOT NULL,
        like INTEGER NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (post_id) REFERENCES posts(id)
    );


    INSERT INTO users (id, name, email, password, role)
    VALUES("id001", "Neymar JR", "ney@gmail.com", "recovery123", "USER"),
    ("id002", "Lucas Calabria", "calabria@gmail.com", "lucas123", "ADM"),
    ("id003", "Steph Curry", "curry3pt@gmail.com", "chef123", "USER"),
    ("id004", "Drake", "champagnepapi@gmail.com", "babybaby123", "USER");


    INSERT INTO posts (id, creator_id, content, likes, dislikes)
    VALUES("post001", "id001", "Photo", 20000, 1000),
    ("post002", "id001", "Photo", 20000, 1000),
    ("post003", "id001", "Reels", 40000, 500),
    ("post004", "id003", "Reels", 50000, 100),
    ("post005", "id004", "Photo", 50000, 100),
    ("post006", "id002", "Story", 50, 1);


