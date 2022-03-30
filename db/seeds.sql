INSERT INTO critic (critic, email, password) 
VALUES
    ("Tom", "tom@tom.com", "tom"),
    ("Bob", "Bob@Bob.com", "Bob"),
    ("Sam", "Sam@Sam.com", "Sam"),
    ("Jack", "Jack@Jack.com", "Jack"),
    ("Paul", "Paul@Paul.com", "Paul");

INSERT INTO movie (title, movie_url, critic_id)
VALUES
    ("The Green Mile", "mile.com", 2),
    ("Rush Hour", "hour.com", 3),
    ("Saving Private Ryan", "saving.com", 1),
    ("Big Daddy", "bigdaddy.com", 3),
    ("Forrest Gump", "gump.com", 1);

INSERT INTO review (review_text, critic_id, movie_id)
VALUES
    ("lorem ipsum blah blah blah review", 1, 2),
    ("lorem ipsum blah blah blah review", 1, 3),
    ("lorem ipsum blah blah blah review", 2, 2),
    ("lorem ipsum blah blah blah review", 4, 4),
    ("lorem ipsum blah blah blah review", 3, 2),
    ("lorem ipsum blah blah blah review", 3, 3),
    ("lorem ipsum blah blah blah review", 3, 1),
    ("lorem ipsum blah blah blah review", 1, 4);
