/** @type {import('next').NextConfig} */
const githubPages = process.env.GITHUB_PAGES === "true";
const cloudflarePages = process.env.CLOUDFLARE_PAGES === "true";
const nextConfig = {
  images: { unoptimized: true },
  ...((githubPages || cloudflarePages) ? { output: "export", trailingSlash: true } : {}),
  ...(githubPages ? { basePath: "/manifesto" } : {}),
};
export default nextConfig;
