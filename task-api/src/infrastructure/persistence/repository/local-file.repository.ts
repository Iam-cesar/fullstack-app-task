import { readFile, writeFile } from 'fs/promises';
import * as path from 'path';

const DB_FILE_PATH = path.resolve(__dirname, '../db/task.db.json');

export class LocalFileRepository {
  protected async readFile() {
    return JSON.parse(await readFile(DB_FILE_PATH, 'utf-8'));
  }

  protected async writeFile(data): Promise<void> {
    await writeFile(DB_FILE_PATH, JSON.stringify(data));
  }
}
