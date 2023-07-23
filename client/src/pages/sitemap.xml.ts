const EXTERNAL_DATA_URL = "https://localhost:3000";

import fs from "fs";
import path from "path";

function generateSiteMap(posts: any) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <!--We manually set the two URLs we know already-->
     <url>
       <loc>${EXTERNAL_DATA_URL}</loc>
     </url>
    
     ${posts
       .map((one) => {
         if (one.includes("index")) return;
         return `
       <url>
           <loc>${`${EXTERNAL_DATA_URL}/${one}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  const pagesDirectory = path.join(process.cwd(), "/src/pages");

  const pages = getAllPages(pagesDirectory);
  // We make an API call to gather the URLs for our site
  //   const request = await fetch(EXTERNAL_DATA_URL);
  //   const posts = await request.json();

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(pages);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

function getAllPages(directory) {
  const files = fs.readdirSync(directory);

  console.log("Files>>>", files);
  const pages = files
    .filter(
      (file) =>
        !file.startsWith("_") &&
        (file.endsWith(".js") ||
          file.endsWith(".jsx") ||
          file.endsWith(".ts") ||
          file.endsWith(".tsx"))
    )
    .map((file) => {
      const indexForDot = file.lastIndexOf(".");
      return `${file.slice(0, indexForDot)}`;
    }); // Remove the file extension from the path

  return pages;
}
export default SiteMap;
