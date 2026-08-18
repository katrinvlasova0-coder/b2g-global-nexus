import test from 'node:test';
import assert from 'node:assert/strict';
import { BLOG_CATEGORIES, parseBlogMdx } from './blog-parse.js';

const FIXTURE = `---
title: "How to read a tender notice: fields, lots and deadlines"
titleEn: "How to read a tender notice: fields, lots and deadlines"
description: "Educational briefing on reading a public tender notice. No win promises; verify the official portal."
descriptionEn: "Educational briefing on reading a public tender notice. No win promises; verify the official portal."
datePublished: "2026-08-18"
dateModified: "2026-08-18"
author:
  name: "B2G Editorial"
  role: "Editorial"
category: "Tenders"
readTime: "8 min"
coverImage: "https://images.unsplash.com/photo-test?w=1200"
featured: false
tags: ["read a tender notice", "Tenders", "public procurement", "2026"]
faq:
  - question: "What is a tender notice?"
    answer: "The official invitation published by the contracting authority."
  - question: "Is B2G a government agency?"
    answer: "No. B2G Global Services Corp. is a private company."
---

A tender notice is the primary source.

## Fields that matter

Leave your contacts for a consultation on tender selection and documentation preparation.

*This material is for informational and educational purposes only.*
`;

test('parseBlogMdx reads frontmatter, FAQ list and body', () => {
  const post = parseBlogMdx('how-to-read-a-tender-notice', FIXTURE);

  assert.equal(post.slug, 'how-to-read-a-tender-notice');
  assert.equal(post.title, 'How to read a tender notice: fields, lots and deadlines');
  assert.equal(post.category, 'Tenders');
  assert.equal(post.author.name, 'B2G Editorial');
  assert.equal(post.datePublished, '2026-08-18');
  assert.equal(post.tags[0], 'read a tender notice');
  assert.equal(post.faq.length, 2);
  assert.equal(post.faq[0].question, 'What is a tender notice?');
  assert.match(post.body, /A tender notice is the primary source/);
  assert.equal(post.featured, false);
});

test('BLOG_CATEGORIES match the landing capability clusters', () => {
  assert.deepEqual(BLOG_CATEGORIES, ['Tenders', 'Documentation', 'Financing', 'Contractors']);
});
