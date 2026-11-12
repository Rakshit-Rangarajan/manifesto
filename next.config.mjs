/** @type {import('next').NextConfig} */
const githubPages = process.env.GITHUB_PAGES === "true";
const nextConfig = {
  images: { unoptimized: true },
  ...(githubPages ? { output: "export", basePath: "/manifesto", trailingSlash: true } : {}),
};
export default nextConfig;
