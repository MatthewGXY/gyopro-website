module.exports = function (eleventyConfig) {
  // Static assets — copied as-is to dist/
  eleventyConfig.addPassthroughCopy({ assets: "assets" });
  eleventyConfig.addPassthroughCopy({ admin: "admin" });

  // Filters
  eleventyConfig.addFilter("telLink", function (phone) {
    return String(phone || "").replace(/[^+\d]/g, "");
  });

  eleventyConfig.addFilter("dateNice", function (date) {
    if (!date) return "";
    const d = new Date(date);
    if (isNaN(d)) return String(date);
    return d.toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  // Convert newlines to <br> for safe display
  eleventyConfig.addFilter("nl2br", function (str) {
    return String(str || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\r?\n/g, "<br>");
  });

  return {
    dir: {
      input: "src",
      output: "dist",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html", "11ty.js"]
  };
};