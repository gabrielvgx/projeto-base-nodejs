import fs from "fs";

export function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

export function ucfirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}