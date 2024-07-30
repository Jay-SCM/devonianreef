
import fs from 'fs';
import path from 'path';

const translationsDir = path.join(process.cwd(), 'translations');

export const loadTranslations = (locale: string) => {
  const filePath = path.join(translationsDir, `${locale}.json`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
};

export const translateText = (text: string, translations: Record<string, string>) => {
  return translations[text] || text;
};
