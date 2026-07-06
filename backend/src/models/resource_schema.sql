CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS "Resource" (
    Trans_Id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    Auth_Name TEXT NOT NULL,
    Title TEXT NOT NULL,
    Contain_Link TEXT,
    Contain_Type VARCHAR(100) NOT NULL,
    Time_of_Upload TIME DEFAULT CURRENT_TIME,
    Date_of_Upload DATE DEFAULT CURRENT_DATE,
    Images TEXT,
    Description TEXT,
    User_Email TEXT,
    Resource_Keyword TEXT[]
);