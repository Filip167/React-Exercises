const mtp = require("madlibs-template-parser");
const db = require("../models");

function getStoryParts(templateBody) {
  const paragraphs = mtp(templateBody);
  const firstParagraph = paragraphs[0];
  const parts = [];

  for (let i = 0; i < firstParagraph.length; i++) {
    const word = firstParagraph[i];
    parts.push({
      category: word.category,
      variant: word.variant,
      type: word.type,
      text: word.text,
    });
  }

  return parts;
}

function getBlanks(templateBody) {
  const allParts = getStoryParts(templateBody);
  const blanks = [];
  for (let i = 0; i < allParts.length; i++) {
    const part = allParts[i];
    if (part.type === "blank") {
      blanks.push({ index: i, category: part.category, variant: part.variant });
    }
  }
  return blanks;
}

async function formStory(templateId, blanks) {
  const template = await db.Templates.findByPk(templateId);
  const parts = getStoryParts(template.templateBody);
  const story = [];
  let blankIndex = 0;

  for (let i = 0; i < parts.length; i++) {
    if (parts[i].type === "blank") {
      story.push(blanks[blankIndex]);
      blankIndex++;
    } else {
      story.push(parts[i].text);
    }
  }

  return story.join(" ");
}

module.exports = {
  getBlanks,
  formStory,
};
