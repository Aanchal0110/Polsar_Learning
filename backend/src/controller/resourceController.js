const { query } = require("../config/database");
const fs = require("fs");
const path = require("path");
require("dotenv").config;

const resourceModel = {

    async init() {
        const sql = fs.readFileSync(
          path.join(__dirname, "../models/resource_schema.sql"),
          "utf8"
        );
        return query(sql);
      }
    ,
    async create({ auth_name, title, contain_link, contain_type, images, description, user_email, resource_keyword}) {
        const sql = `
          INSERT INTO "Resource"
          (Auth_Name, Title, Contain_Link, Contain_Type, Images, Description, User_Email, Resource_Keyword)
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          RETURNING *;
        `;
        const params = [
          auth_name,
          title,
          contain_link,
          contain_type,
          images,
          description,
          user_email,
          resource_keyword,
        ];
        const { rows } = await query(sql, params);
        return rows[0];
      }
    ,
    async fetch(type, limit = 10) {
        const sql = `
          SELECT * FROM "Resource"
          WHERE Contain_Type = $1
          ORDER BY Date_of_Upload DESC, Time_of_Upload DESC
          LIMIT $2;
        `;
        const { rows } = await query(sql, [type, limit]);
        return rows;
      }
    ,
    async update(trans_id, fieldsToUpdate) {
        const keys = Object.keys(fieldsToUpdate);
        const values = Object.values(fieldsToUpdate);
    
        const setClause = keys.map((key, idx) => `"${key}" = $${idx + 1}`).join(", ");
        const sql = `
          UPDATE "Resource"
          SET ${setClause}
          WHERE Trans_Id = $${keys.length + 1}
          RETURNING *;
        `;
    
        const { rows } = await query(sql, [...values, trans_id]);
        return rows[0];
      }
    ,
    async delete(trans_id) {
        const sql = `DELETE FROM "Resource" WHERE Trans_Id = $1 RETURNING *;`;
        const { rows } = await query(sql, [trans_id]);
        return rows[0];
      }

}

const resourceController = {
    async create(req, res) {
        try {
          const {
            auth_name,
            title,
            contain_link,
            contain_type,
            description,
            user_email,
            resource_keyword,
          } = req.body;
    
          const images = req.body.images || null; // optional
    
          if (!auth_name || !title || !contain_type) {
            return res.status(400).json({ success: false, message: "Missing required fields" });
          }
    
          const newResource = await resourceModel.create({
            auth_name,
            title,
            contain_link,
            contain_type,
            images,
            description,
            user_email,
            resource_keyword,
          });
    
          res.status(201).json({ success: true, data: newResource });
        } catch (err) {
          console.error("Create Resource Error:", err);
          res.status(500).json({ success: false, message: "Server error" });
        }
    },
    async fetch(req, res) {
        try {
          const { type } = req.params;
          const resources = await resourceModel.fetch(type, 20);
          res.json({ success: true, data: resources });
        } catch (err) {
          console.error("Fetch Resource Error:", err);
          res.status(500).json({ success: false, message: "Server error" });
        }
    },
    async update(req, res) {
        try {
          const { id } = req.params;
          const updated = await resourceModel.update(id, req.body);
          res.json({ success: true, data: updated });
        } catch (err) {
          console.error("Update Resource Error:", err);
          res.status(500).json({ success: false, message: "Server error" });
        }
    },
    async delete(req, res) {
        try {
          const { id } = req.params;
          const deleted = await resourceModel.delete(id);
          res.json({ success: true, data: deleted });
        } catch (err) {
          console.error("Delete Resource Error:", err);
          res.status(500).json({ success: false, message: "Server error" });
        }
      },
}

module.exports = {
    resourceModel,
    resourceController
}