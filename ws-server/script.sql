-- ELIMINA DATABASE E TABELLE
DROP DATABASE IF EXISTS `gestione_ticket`;  
-- Creazione del database e della tabella Users
CREATE DATABASE `gestione_ticket`;
USE `gestione_ticket`;
-- Creazione della tabella Users
CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY, 
    nome VARCHAR(50), 
    cognome VARCHAR(50), 
    data_nascita DATE, 
    email VARCHAR(100), 
    username VARCHAR(20) NOT NULL UNIQUE, 
    password VARCHAR(200) NOT NULL
    );

CREATE TABLE Tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titolo VARCHAR(100),
    descrizione VARCHAR(500),
    data_creazione DATE,
    data_chiusura DATE,
    stato VARCHAR(20),
    id_utente INT,
    FOREIGN KEY (id_utente) REFERENCES Users(id)
    );

