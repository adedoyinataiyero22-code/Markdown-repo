const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

let updating = false;
function markdownToHTML(markdown) {
  const lines = markdown.split("\n");
  let html = "";

  lines.forEach(line => {

    if (/^###### /.test(line)) {
      html += `<h6>${line.slice(7)}</h6>\n`;
    }

    else if (/^##### /.test(line)) {
      html += `<h5>${line.slice(6)}</h5>\n`;
    }

    else if (/^#### /.test(line)) {
      html += `<h4>${line.slice(5)}</h4>\n`;
    }

    else if (/^### /.test(line)) {
      html += `<h3>${line.slice(4)}</h3>\n`;
    }

    else if (/^## /.test(line)) {
      html += `<h2>${line.slice(3)}</h2>\n`;
    }

    else if (/^# /.test(line)) {
      html += `<h1>${line.slice(2)}</h1>\n`;
    }

    else if (/^> /.test(line)) {
      html += `<blockquote>${line.slice(2)}</blockquote>\n`;
    }

    else if (/^- /.test(line)) {
      html += `<ul>\n  <li>${line.slice(2)}</li>\n</ul>\n`;
    }

    else if (/^\d+\. /.test(line)) {
      html += `<ol>\n  <li>${line.replace(/^\d+\.\s/, "")}</li>\n</ol>\n`;
    }

    else if (line === "---") {
      html += `<hr>\n`;
    }
  
    else if (line.trim() === "") {
      html += "\n";
    }

    else {
      html += `<p>${line}</p>\n`;
    }
  });

  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");

  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  html = html.replace(
    /!\[(.*?)\]\((.*?)\)/g,
    '<img alt="$1" src="$2">'
  );

  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2">$1</a>'
  );

  return html.trim();
}

function htmlToMarkdown(html) {

  let markdown = html;

  markdown = markdown.replace(/<h1>(.*?)<\/h1>/gi, "# $1\n");
  markdown = markdown.replace(/<h2>(.*?)<\/h2>/gi, "## $1\n");
  markdown = markdown.replace(/<h3>(.*?)<\/h3>/gi, "### $1\n");
  markdown = markdown.replace(/<h4>(.*?)<\/h4>/gi, "#### $1\n");
  markdown = markdown.replace(/<h5>(.*?)<\/h5>/gi, "##### $1\n");
  markdown = markdown.replace(/<h6>(.*?)<\/h6>/gi, "###### $1\n");

  markdown = markdown.replace(
    /<blockquote>(.*?)<\/blockquote>/gi,
    "> $1\n"
  );

  markdown = markdown.replace(
    /<p>(.*?)<\/p>/gi,
    "$1\n"
  );

  markdown = markdown.replace(
    /<strong>(.*?)<\/strong>/gi,
    "**$1**"
  );

  markdown = markdown.replace(
    /<em>(.*?)<\/em>/gi,
    "*$1*"
  );

  markdown = markdown.replace(
    /<img alt="(.*?)" src="(.*?)">/gi,
    "![$1]($2)"
  );

  markdown = markdown.replace(
    /<a href="(.*?)">(.*?)<\/a>/gi,
    "[$2]($1)"
  );

  markdown = markdown.replace(
    /<ul>\s*<li>(.*?)<\/li>\s*<\/ul>/gis,
    "- $1\n"
  );

  markdown = markdown.replace(
    /<ol>\s*<li>(.*?)<\/li>\s*<\/ol>/gis,
    "1. $1\n"
  );

  markdown = markdown.replace(
    /<hr>/gi,
    "---\n"
  );

  return markdown.trim();
}

markdownInput.addEventListener("input", () => {
  if (updating) return;

  updating = true;

  const html = markdownToHTML(markdownInput.value);

  htmlOutput.value = html;
  preview.innerHTML = html;

  updating = false;
});

htmlOutput.addEventListener("input", () => {
  if (updating) return;

  updating = true;

  markdownInput.value = htmlToMarkdown(htmlOutput.value);
  preview.innerHTML = htmlOutput.value;

  updating = false;
});