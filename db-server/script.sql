CREATE TABLE Users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50),
    data_nascita DATE,
    email VARCHAR(100),
    username VARCHAR(20) NOT NULL UNIQUE,
    password VARCHAR(200) NOT NULL
);

INSERT INTO Users 
(nome, cognome, data_nascita, email, username)
VALUES ('Andrea', 'Trentini', '2023-04-08', 'andrea.trentini@marconirovereto.it', 'andrea.trentini');