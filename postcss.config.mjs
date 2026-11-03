import { createRequire } from 'module';

var require = createRequire(import.meta.url);
var module = { exports: {} };

/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
};

export default nextConfig;
