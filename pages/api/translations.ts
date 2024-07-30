import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { locale } = req.query;
  if (!locale || typeof locale !== 'string') {
    res.status(400).json({ error: 'Locale is required' });
    return;
  }

  const translationsDir = path.join(process.cwd(), 'translations');
  const filePath = path.join(translationsDir, `${locale}.json`);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf8');
    res.status(200).json(JSON.parse(data));
  } else {
    res.status(404).json({ error: 'Translations not found' });
  }
}
