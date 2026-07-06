CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS DomainExpert (
    card_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_Name VARCHAR(255) NOT NULL,
    ExpertEmail TEXT NOT NULL,
    Description TEXT,
    Expert_Type VARCHAR(40),
    Image TEXT
);