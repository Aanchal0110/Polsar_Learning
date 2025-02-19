const settings = require("../config/settings");
const MainController = require("../controller/MainController")
const express = require("express");

const router = express.Router();

router.get("", MainController.PageController.home_page);

router.get("/blogs", MainController.PageController.blog_page);
router.get("/blogwrite", MainController.PageController.write_blog_page);

router.get("/domain_experts", MainController.PageController.domain_experts);
router.get("/domain_experts/academic", MainController.PageController.academic_pages);
router.get("/domain_experts/scientists", MainController.PageController.scientist_page);
router.get("/domain_experts/industry_personality", MainController.PageController.industry_personality_page);
router.get("/domain_experts/researchers", MainController.PageController.researcher_page);

router.get("/Login", MainController.PageController.login_page);

router.get("/resource/fundamentals", MainController.PageController.fundamental_page);
router.get("/resource/technical_papers", MainController.PageController.technical_paper_pages);
router.get("/resource/books", MainController.PageController.books_page);
router.get("/resource/videos", MainController.PageController.videos_page);
router.get("/resource/relevents_links", MainController.PageController.relevents_links_page);

router.get("/downloads", MainController.PageController.data_download_page);
router.get("/downloads/data_downloads", MainController.PageController.data_download_page);
router.get("/downloads/open_softwares", MainController.PageController.open_software_page);

router.get("/education", MainController.PageController.diploma_page);
router.get("education/diploma", MainController.PageController.diploma_page);
router.get("education/Master", MainController.PageController.Master_page);


module.exports = {
    router,
}