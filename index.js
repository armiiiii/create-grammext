#!/usr/bin/env node

const fs = require('node:fs');
const path = require('node:path');

async function main() {
  // Берем имя проекта из аргументов
  const projectName = process.argv[2] || 'my-grammext-bot';
  
  console.log(`🚀 Creating ${projectName}...`);
  
  // Путь к шаблону и целевому проекту
  const templateDir = path.join(__dirname, 'templates', 'default');
  const targetDir = path.resolve(process.cwd(), projectName);
  
  // Копируем
  copyDir(templateDir, targetDir);
  
  // Обновляем package.json с именем проекта
  const packagePath = path.join(targetDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  pkg.name = projectName;
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  
  console.log(`✅ Project created at ${targetDir}`);
  console.log('\nNext steps:');
  console.log(`  cd ${projectName}`);
  console.log('  npm install');
  console.log('  npm run dev');
}

// Простая функция копирования
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const file of fs.readdirSync(src)) {
    const srcPath = path.join(src, file);
    const destPath = path.join(dest, file);
    if (fs.statSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

(() => {
  main().catch(console.error);
})()
