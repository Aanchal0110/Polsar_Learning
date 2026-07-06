CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop the dependent table FIRST
-- DROP TABLE IF EXISTS "Post_Tag";
DROP TABLE IF EXISTS Post;
-- DROP TABLE IF EXISTS "Tag";

-- Create Post table
CREATE TABLE IF NOT EXISTS Post (
    post_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    User_id UUID NOT NULL,                                 
    User_Name VARCHAR(255) NOT NULL,                       
    Text_Location TEXT NOT NULL,                           
    Title VARCHAR(255) NOT NULL,                           
    Created_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        
    Updated_At TIMESTAMP DEFAULT CURRENT_TIMESTAMP,        
    Status VARCHAR(30) DEFAULT 'draft',                    
    Cover_page TEXT                                        
);

-- -- Create Tag table
-- CREATE TABLE IF NOT EXISTS Tag (
--     tag_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
--     name VARCHAR(50) UNIQUE NOT NULL
-- );

-- -- Create junction table
-- CREATE TABLE IF NOT EXISTS Post_Tag (
--     post_id UUID REFERENCES Post(post_id) ON DELETE CASCADE,
--     tag_id UUID REFERENCES Tag(tag_id) ON DELETE CASCADE,
--     PRIMARY KEY (post_id, tag_id)
-- );
