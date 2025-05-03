const settings = require("../config/settings");
const path = require("path")
const fs = require("fs");


const home_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/home.html"))
}

const blog_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/blog.html"))
}

const write_blog_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/blogwrite.html"))
}

// error no man page for domain expert
const domain_experts = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/domain_experts.html"))
}

const login_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/login.html"))
}

const fundamental_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Fundamental.html"))
}

const technical_paper_pages = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Technical Paper.html"))
}

const books_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Books.html"));
}

const videos_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Videos.html"))
}

// error relevents page is empty , it is removed
const relevents_links_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/Relevant Links.html"))
}

const academic_pages = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/academicians.html"))
}

const scientist_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/scientists.html"))
}

const industry_personality_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Industry Personnel.html"))
}

const researcher_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Researchers.html"))
}


const data_download_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/datadownloads.html"))
}

const open_software_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/opensource.html"))
}

// error diploma page is empty, removed
const diploma_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Diploma.html"))
}

// error degree page is empty removed
const degree_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Degree.html"))
}

// error master page is empty removed
const Master_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Master.html"))
}

// error phd page is empty removed
const PHD_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/Ph.D.html"))
}


const career_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/career.html"));
}

 
const contact_page = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/Pages/contact.html"));
}

const dashboard = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/Dashboard.html"))
}

const microwave = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/microwave.html"))
}

const opticalwave = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/optical.html"))
}

const remote_sensing = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/remote-sensing.html"))
}

const blog_post = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/post1.html"))
}

const career = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/career.html"))
}

const events = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/news.html"  ))
}

const contact_us = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/contact.html"))
}

const education = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/infi website/HTML/education.html"))
}

module.exports = {
    home_page, blog_page, write_blog_page,
    domain_experts, login_page, fundamental_page,
    technical_paper_pages, books_page, videos_page,
    relevents_links_page, academic_pages, scientist_page,
    industry_personality_page, researcher_page, data_download_page,
    open_software_page, diploma_page, degree_page,
    Master_page, PHD_page, career_page,
    contact_page, dashboard, microwave, opticalwave, remote_sensing, blog_post,
    career, events, contact_us, education

}