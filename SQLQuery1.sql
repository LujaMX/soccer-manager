CREATE DATABASE Soccer;


CREATE TABLE League
(
    Id INT IDENTITY(1,1),
    Name VARCHAR(50) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    StartDate DATE NOT NULL DEFAULT GETDATE(),
    EndDate DATE NOT NULL DEFAULT GETDATE(),
    Enabled BIT NOT NULL DEFAULT 1,

    CONSTRAINT PK_League PRIMARY KEY (Id),
    CONSTRAINT CHK_League_Date CHECK (StartDate <= EndDate)
);


CREATE TABLE Team
(
    Id INT IDENTITY(1,1),
    Name VARCHAR(50) NOT NULL,
    Country VARCHAR(50) NOT NULL,
    PlayersQuantity INT NOT NULL,
    Enabled BIT NOT NULL DEFAULT 1,

    CONSTRAINT PK_Team PRIMARY KEY (Id),
    CONSTRAINT CHK_Team_PlayersQuantity CHECK (PlayersQuantity BETWEEN 11 AND 22)
);



CREATE TABLE LeagueTeam
(
    LeagueId INT NOT NULL,
    TeamId INT NOT NULL,

    PRIMARY KEY (LeagueId, TeamId),

    FOREIGN KEY (LeagueId)
        REFERENCES League(Id),

    FOREIGN KEY (TeamId)
        REFERENCES Team(Id)
);