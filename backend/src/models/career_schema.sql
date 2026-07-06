CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE IF NOT EXISTS Career (
    Trans_Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Organizer_Email TEXT NOT NULL,
    Career_Type TEXT,
    Career_Opportunity VARCHAR(100) NOT NULL,
    Time_of_Upload TIME DEFAULT CURRENT_TIME,
    Description TEXT
);