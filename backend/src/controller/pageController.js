const settings = require("../config/settings");
const path = require("path")
const fs = require("fs");


const home_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/home.html"))
}

const blog_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/blog.html"))
}

const write_blog_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/blogwrite.html"))
}

const domain_experts = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/domain_experts.html"))
}

const login_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/login.html"))
}

const fundamental_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Fundamental.html"))
}

const technical_paper_pages = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Technical Paper.html"))
}

const books_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Books.html"));
}

const videos_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Videos.html"))
}

const relevents_links_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Relevant Links.html"))
}

const academic_pages = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/academicians.html"))
}

const scientist_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/scientists.html"))
}

const industry_personality_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/academicians.html"))
}

const researcher_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Researchers.html"))
}

const data_download_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/home.html"))
}

const open_software_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/home.html"))
}

const diploma_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Diploma.html"))
}

const degree_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Degree.html"))
}

const Master_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Master.html"))
}

const PHD_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Ph_D.html"))
}

const career_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/home.html"));
}

const contact_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/home.html"));
}

module.exports = {
    home_page, blog_page, write_blog_page,
    domain_experts, login_page, fundamental_page,
    technical_paper_pages, books_page, videos_page,
    relevents_links_page, academic_pages, scientist_page,
    industry_personality_page, researcher_page, data_download_page,
    open_software_page, diploma_page, degree_page,
    Master_page, PHD_page, career_page,
    contact_page

}