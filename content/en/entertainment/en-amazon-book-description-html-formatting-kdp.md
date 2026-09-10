---
title: "Amazon Book Description Formatting: HTML Tips Every KDP Author Needs"
description: "Amazon lets you use HTML in your book description — but most authors either do not know this or get it wrong. Here is exactly which tags work, which do not, and how to format your description for maximum visual impact and conversions."
date: "2026-09-10"
---

# Amazon Book Description Formatting: HTML Tips Every KDP Author Needs

Open any top-selling book on Amazon and look at its description. You will see bold headlines, italic emphasis, clean line breaks, and sometimes even bullet points. Now look at most self-published book descriptions. You will see a single block of unformatted text — a gray wall of words that nobody wants to read.

The difference is not talent. It is HTML. Amazon's book description field accepts basic HTML tags that let you format your text with bold, italic, headings, line breaks, and lists. These formatting tools are free, available to every KDP author, and can dramatically improve the readability and conversion rate of your description. And yet the majority of indie authors either do not know HTML formatting exists, or have tried it and gotten frustrated by the tags that Amazon silently strips.

This guide covers every HTML tag that works in Amazon book descriptions, the ones that do not, and the formatting strategies that make your description stand out in the most competitive marketplace in publishing.

## HTML basics for Amazon descriptions

### Where do you enter HTML in your book description?

When you create or edit your book on KDP, the description field has two modes: a visual editor (WYSIWYG) and a source/HTML view. The visual editor is unreliable — it often strips formatting or adds unwanted code. The best practice is to write your description with HTML tags in a text editor (Notepad, VS Code, or any plain-text editor) and paste the complete HTML into the source view.

You can also edit your book description after publication through Author Central (author.amazon.com), which provides a more robust HTML editor. Many experienced authors write their descriptions in the KDP upload and then refine the formatting through Author Central.

### Which HTML tags work on Amazon?

Amazon accepts a limited set of HTML tags. Knowing exactly which ones work saves you from the frustration of formatting that looks perfect in your editor and disappears on the live page.

Tags that work: `<b>` for bold text, `<i>` for italic text, `<br>` for line breaks, `<p>` for paragraphs, `<h2>` and `<h3>` for subheadings (though these render inconsistently across devices), and `<ul>` with `<li>` for unordered bullet lists.

Tags that Amazon strips: `<h1>`, `<div>`, `<span>`, `<font>`, `<table>`, `<img>`, `<a>` (links), and any CSS styling. You cannot change colors, font sizes, or font families. You cannot add images or hyperlinks. Amazon enforces a strict subset of HTML to maintain visual consistency across its platform.

### How do you create line breaks and spacing?

This is where most authors get tripped up. A regular line break in your text editor does not create a line break on Amazon. You must use the `<br>` tag explicitly.

For a single line break (moving to the next line without a gap), use one `<br>`. For a paragraph-style gap (a blank line between sections), use `<br><br>`. The `<p>` tag also creates paragraph spacing, but `<br><br>` gives you more predictable control across devices.

Never rely on blank lines in your source code to create spacing. Amazon's parser will collapse them. Every line break you want the reader to see must be explicitly tagged.

## Formatting strategies that convert

### How should you format a fiction book description?

Fiction descriptions benefit from a cinematic formatting approach: short paragraphs, strategic bold for emphasis, and white space that lets each emotional beat land.

A proven structure looks like this: an opening hook in bold or italic (two to three lines maximum), followed by a `<br><br>` gap. Then two to three short paragraphs of escalating tension, each separated by `<br><br>`. Then a closing line — often a question or provocative statement — in bold or italic.

The visual effect should feel like a movie trailer: punchy, atmospheric, with pauses between beats that create rhythm. A solid wall of text does not have rhythm. It has density. And density on a product page is the visual equivalent of a closed door.

### How should you format a nonfiction book description?

Nonfiction descriptions benefit from a more structured approach because readers are scanning for specific value propositions. A combination of bold headings, short paragraphs, and bullet points works extremely well.

A proven structure: a bold opening statement that names the problem or promise (two to three lines). A short paragraph expanding on why this matters now. Then a bullet list of what the reader will learn or gain — each bullet starting with a bold keyword or phrase followed by a brief explanation. Finally, a bold closing call to action.

Bullet points are particularly powerful for nonfiction because they allow rapid scanning. A reader can glance at your bullet list in three seconds and determine whether the book addresses their specific needs. Without bullets, that same information buried in paragraph form takes thirty seconds to parse — and most readers will not invest thirty seconds in a description.

### When should you use bold and italic?

Bold draws the eye. Use it for: opening hooks, key emotional words or phrases (not entire sentences), benefit statements in nonfiction, and closing calls to action. Bold should represent no more than 15-20% of your total description text. Over-bolding makes everything look important, which means nothing looks important.

Italic creates emphasis and voice. Use it for: book titles mentioned in the description, internal thoughts or character voice, and taglines or thematic statements. Italic is softer than bold — it whispers rather than shouts — and is ideal for moments where you want the reader to feel rather than notice.

Never use bold and italic together on the same text. The visual effect is cluttered and desperate. Choose the one that serves the moment better.

## Advanced formatting techniques

### How do you create a professional-looking bullet list?

Amazon supports `<ul>` (unordered list) with `<li>` (list item) tags. A basic bullet list looks like this in HTML:

The key to effective bullet lists in descriptions is front-loading value. Start each bullet with the benefit or feature in bold, then follow with a brief explanation. This structure lets scanners absorb the key points from the bold text alone while giving engaged readers the detail they want.

Keep bullet lists to 4-7 items. Fewer than four looks sparse. More than seven overwhelms. Each bullet should be one to two lines maximum — a bullet that wraps to three or four lines defeats the purpose of using a list format.

### How do you structure a description for mobile readers?

Over 60% of Amazon shopping happens on mobile devices, where screen width is narrow and descriptions are truncated more aggressively. Formatting that looks great on desktop can become a disaster on a phone screen.

Rules for mobile-friendly descriptions: keep line lengths short (mobile screens break lines unpredictably on long sentences), avoid wide bullet points (keep each bullet under 100 characters if possible), use `<br>` breaks generously to prevent text from clumping, and front-load your most important content because the mobile "Read more" fold is higher than desktop.

Test your description on a phone before finalizing. Open your book's Amazon page on your mobile browser and read the description as a customer would. If the above-fold content does not hook you in three seconds, revise.

### Should you use emojis in your book description?

Some authors use emojis (checkmarks, stars, fire, books) as visual bullets in their descriptions. Amazon currently supports most Unicode emojis in descriptions, and they do render on both desktop and mobile.

The question is whether they help or hurt. In nonfiction — particularly in self-help, productivity, and business categories — emojis can improve scannability and add visual energy. In fiction, emojis generally feel out of place and can undermine the tonal authority of your description. Use them if your genre and audience embrace casual, high-energy presentation. Avoid them if your genre values sophistication or atmosphere.

## Testing and optimizing

### How do you know if your formatting is working?

Amazon does not provide conversion rate data for book descriptions. But you can infer performance from your click-to-sale ratio. If your book appears in search results (impressions) and gets clicked (page views) but does not convert into sales at a reasonable rate, your description is the most likely bottleneck.

Amazon Ads provides the clearest signal. If you run sponsored product ads, you can see your click-through rate (CTR) and your conversion rate. A book with a strong cover will have a decent CTR. If the conversion rate is low despite good CTR, the description is failing to close the sale.

### How often should you revise your description?

Treat your description as a living document, not a publish-and-forget artifact. Revise it when: your book has been live for 30 days and sales are below expectations, when you receive feedback (from readers or in reviews) that suggests a mismatch between the description and the book, when comparable bestsellers in your category update their descriptions with a new approach, or when you learn new techniques.

The best indie authors revise their descriptions two to four times per year, testing different hooks, structures, and formatting approaches. Small changes can produce measurable results — a new opening line, a restructured bullet list, or a stronger closing can shift conversion rates by several percentage points.

**Also worth reading:**

- [How to Write a Book Description That Sells](/articles/en/entertainment/en-how-to-write-book-description-that-sells)
- [Book Blurb Examples by Genre: Templates That Actually Convert](/articles/en/entertainment/en-book-blurb-examples-genre-templates)
- [How to Write a Romance Novel That Actually Sells](/articles/en/entertainment/en-how-to-write-romance-novel-that-sells)

---

## Templates, HTML snippets, and power words — ready to use

This article shows you the technique. The complete guide gives you 24 genre-specific templates with the HTML already built in, plus power word lists and a 15-point revision checklist. Just fill in your details, paste into KDP, and publish.

**[>>> Discover the guide: Book Description & Blurb Templates <<<](/boutique/en/book-description-blurb-templates)**
