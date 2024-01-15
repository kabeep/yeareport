import process from 'node:process';
import path from 'node:path';

export default path.resolve(process.env.HOME as string, 'Downloads');
