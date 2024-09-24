const express = require("express");
const router = express.Router();
const db = require("../models");
const madlibs = require("../lib/madlibs");

// GET route on index page to display story title and teaser
router.get("/", async (req, res) => {
  try {
    const templates = await db.Templates.findAll({ raw: true });
    res.json(templates);  // Return templates as JSON for API consumption
  } catch (err) {
    console.log("An error occurred:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route on create page to display form for user input
router.get("/create/:id/:title", async (req, res) => {
  try {
    const template = await db.Templates.findOne({ where: { title: req.params.title } });
    const blanks = madlibs.getBlanks(template.templateBody);
    res.json({ title: template.title, teaser: template.teaser, blanks });
  } catch (err) {
    console.log("An error occurred:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST route for creating story and save to db
router.post("/create/:id/:title", async (req, res) => {
  try {
    const completedStory = await madlibs.formStory(req.params.id, req.body);
    const createStory = await db.Stories.create({
      title: req.params.title,
      storyBody: completedStory,
    });
    res.json({ message: "Story created", storyId: createStory.id });
  } catch (err) {
    console.log("An error occurred:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET the completed story from the db
router.get("/result/:id", async (req, res) => {
  try {
    const story = await db.Stories.findByPk(req.params.id);
    res.json({ title: story.title, storyBody: story.storyBody });
  } catch (err) {
    console.log("An error occurred:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET route to render all stories
router.get("/stories", async (req, res) => {
  try {
    const stories = await db.Stories.findAll({ raw: true, order: [["id", "DESC"]] });
    res.json(stories);
  } catch (err) {
    console.log("An error occurred:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
