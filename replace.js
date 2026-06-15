const fs = require('fs');
let content = fs.readFileSync('components/sections/products.tsx', 'utf8');
content = content.replace(/image: "https:\/\/images\.unsplash\.com\/[^"]+"/g, 'image: "/images/prod_12.webp"');
fs.writeFileSync('components/sections/products.tsx', content);
