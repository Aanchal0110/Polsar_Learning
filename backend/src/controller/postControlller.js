const { query } = require("../config/database");
const { uploadBuffer} = require("../services/uploadToDrive");
const fs = require("fs");
const path = require("path");
require("dotenv").config;

// Note : Remember to add the text file to drive and images to the google drive

const postModel = {

    async init() {
        // query to create the table
        const sql = fs.readFileSync(path.join(__dirname, "../models/post_schema.sql"), 'utf8');
        return query(sql);
    }
    ,
    async create({ user_id, user_name, text_location, title, status = "draft", cover_page = null }) {
        const sql = `
          INSERT INTO Post (User_id, User_Name, Text_Location, Title, Status, Cover_page)
          VALUES ($1, $2, $3, $4, $5, $6)
          RETURNING *;
        `;
        const values = [user_id, user_name, text_location, title, status, cover_page];
        const result = await query(sql, values);
        return result.rows[0];
    }
    ,
    async delete(post_id, user_id) {
        const sql = `
          DELETE FROM Post
          WHERE post_id = $1 AND User_id = $2
          RETURNING *;
        `;
        const values = [post_id, user_id];
        const result = await query(sql, values);
        return result.rows[0];
    }
    ,
    async update(post_id, user_id, { title, text_location, status, cover_page }) {
        const sql = `
          UPDATE Post
          SET Title = COALESCE($3, Title),
              Text_Location = COALESCE($4, Text_Location),
              Status = COALESCE($5, Status),
              Cover_page = COALESCE($6, Cover_page),
              Updated_At = CURRENT_TIMESTAMP
          WHERE post_id = $1 AND User_id = $2
          RETURNING *;
        `;
        const values = [post_id, user_id, title, text_location, status, cover_page];
        const result = await query(sql, values);
        return result.rows[0];
      }
    ,
    async fetch(limit = 10, offset = 0) {
        const sql = `
          SELECT * FROM Post
          ORDER BY Created_At DESC
          LIMIT $1 OFFSET $2;
        `;
        const values = [limit, offset];
        const result = await query(sql, values);
        return result.rows;
      }
    ,
    async fetchByUserId(user_id) {
        const sql = `
          SELECT * FROM Post
          WHERE User_id = $1
          ORDER BY Created_At DESC;
        `;
        const result = await query(sql, [user_id]);
        return result.rows;
      }
    ,
    async fetchByTitle(title) {
        const sql = `
          SELECT * FROM Post
          WHERE LOWER(Title) LIKE LOWER($1)
          ORDER BY Created_At DESC;
        `;
        const searchTerm = `%${title}%`;
        const result = await query(sql, [searchTerm]);
        return result.rows;
    }
    ,
    async addTagsToPost(post_id, tagNames) {
        for (const name of tagNames) {
          // 1. Insert tag if not exists and get tag_id
          let result = await query(
            `INSERT INTO Tag (name) VALUES ($1)
             ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
             RETURNING tag_id`,
            [name.toLowerCase()]
          );
          let tag_id;
          if (result.rows.length > 0) {
            tag_id = result.rows[0].tag_id;
          } else {
            // Tag existed, get its id
            const res = await query(`SELECT tag_id FROM Tag WHERE name = $1`, [name.toLowerCase()]);
            tag_id = res.rows[0].tag_id;
          }
      
          // 2. Insert into Post_Tag relation
          await query(
            `INSERT INTO Post_Tag (post_id, tag_id) VALUES ($1, $2)
             ON CONFLICT DO NOTHING`,
            [post_id, tag_id]
          );
        }
      }
}

const postController = {
  async create(req, res) {
    try {
      const { title, content, status } = req.body;
      const { postUrl, coverUrl } = req.uploadedFiles;
      // console.log(req.user)
      // const { user_id, username } = req.user; // From JWT payload
      const user_id = req.user.uid;
      const username = req.user.email;
  
      if (!title || !content || !postUrl || !coverUrl) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const insertQuery = `
        INSERT INTO Post (
          User_id,
          User_Name,
          Text_Location,
          Title,
          Status,
          Cover_page
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *
      `;
  
      const values = [
        user_id,
        username,
        postUrl,
        title,
        status || 'draft',
        coverUrl
      ];
  
      const result = await query(insertQuery, values);
  
      res.status(201).json({
        message: 'Post created successfully!',
        post: result.rows[0]
      });
    } catch (error) {
      console.error('Error creating post:', error);
      res.status(500).json({ error: 'Failed to create post' });
    }
  }
    ,
    async getAllPosts(req, res) {
        try {
          const limit = parseInt(req.query.limit) || 10;
          const offset = parseInt(req.query.offset) || 0;
          const posts = await postModel.fetch(limit, offset);
          res.json({ success: true, posts });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to fetch posts" });
        }
      }
    ,
    async getPostByTag(req, res) {
        try {
          const { tagName } = req.params;
          const limit = parseInt(req.query.limit) || 10;
          const offset = parseInt(req.query.offset) || 0;
          const posts = await postModel.fetchByTagName(tagName, limit, offset);
          res.json({ success: true, posts });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to fetch posts by tag" });
        }
      }
     ,
     async getPostByUser(req, res) {
        try {
          const { user_id } = req.params;
          const posts = await postModel.fetchByUserId(user_id);
          res.json({ success: true, posts });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to fetch posts by user" });
        }
      }
    ,
    async getPostByTitle(req, res) {
        try {
          const { title } = req.query;
          const posts = await postModel.fetchByTitle(title);
          res.json({ success: true, posts });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to search posts by title" });
        }
      }
    ,
    async updatePost(req, res) {
        try {
          const { post_id } = req.params;
          const updates = req.body;
          const user_id = req.user.id;
          const updatedPost = await postModel.update(post_id, user_id, updates);
          res.json({ success: true, post: updatedPost });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to update post" });
        }
      }
    ,
    async deletePost(req, res) {
        try {
          const { post_id } = req.params;
          const user_id = req.user.id;
          await postModel.delete(post_id, user_id);
          res.json({ success: true, message: "Post deleted" });
        } catch (error) {
          res.status(500).json({ success: false, error: "Failed to delete post" });
        }
      }
}

module.exports = {
    postModel,
    postController  
}