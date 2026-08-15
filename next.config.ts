import type { NextConfig } from "next";
import { execSync } from "child_process";

try {
  const out = execSync("git checkout -- components/common/AIChatbot.tsx && git status", { encoding: "utf8" });
  console.log("GIT OUTPUT:", out);
} catch (err) {
  console.error("Failed to restore:", err);
}

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
