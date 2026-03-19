import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const messagesPath = path.join(__dirname, 'src', 'lib', 'messages.json');
const messages = JSON.parse(fs.readFileSync(messagesPath, 'utf8'));

Object.keys(messages).forEach(k => {
    console.log(`${k}: ${messages[k].length}`);
});
