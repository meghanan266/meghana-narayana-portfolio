// Run this script manually: node scripts/remove-bg.js
// Requires 'sharp' (npm install sharp --save-dev)
//
// Creates an oval-masked version of the portrait as a quick fallback.
// For best results, upload /assets/bg-pic.png to https://remove.bg,
// download the transparent PNG, and save it as public/assets/portrait-cutout.png

const sharp = require('sharp');
const path = require('path');

async function removeBackground() {
  const inputPath = path.join(__dirname, '..', 'public', 'assets', 'bg-pic.png');
  const outputPath = path.join(__dirname, '..', 'public', 'assets', 'portrait-cutout.png');

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    const width = metadata.width;
    const height = metadata.height;

    const mask = Buffer.from(
      `<svg width="${width}" height="${height}">
        <ellipse cx="${width / 2}" cy="${height / 2}" rx="${width * 0.45}" ry="${height * 0.48}" fill="white"/>
      </svg>`
    );

    await image
      .composite([{ input: mask, blend: 'dest-in' }])
      .png()
      .toFile(outputPath);

    console.log('Created oval-masked portrait at:', outputPath);
    console.log('');
    console.log('For a proper background removal, use https://remove.bg');
    console.log('Upload your photo, download the result, and save it as public/assets/portrait-cutout.png');
  } catch (err) {
    console.error('Error:', err.message);
  }
}

removeBackground();
