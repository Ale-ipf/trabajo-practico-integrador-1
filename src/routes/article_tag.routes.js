import { Router } from "express";

const article_tagsROUTER = Router()

article_tagsROUTER.post("/articles-tags", addTagToArticle);
article_tagsROUTER.delete("/articles-tags/:articleTagId", deleteTagFromArticle);