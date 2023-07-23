import Link from "next/link";
import React from "react";
import fs from "fs";
import path from "path";

const Sitemap = ({ paths }) => {
  return (
    <div>
      <h1>Sitemap</h1>
      <ul>
        {paths.map((path, index) => {
          if (path.includes("index")) path = "/";
          return (
            <li key={index}>
              <Link href={path}>{path}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export async function getServerSideProps() {
  const pagesDirectory = path.join(process.cwd(), "/src/pages");

  const pages = getAllPages(pagesDirectory);
  console.log("THese are all pages", pages);

  return {
    props: {
      paths: pages,
    },
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
      return `/${file.slice(0, indexForDot)}`;
    }); // Remove the file extension from the path

  return pages;
}

export default Sitemap;
