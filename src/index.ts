import * as fs from 'fs';
import * as path from 'path';

import { getApp } from './agenda/app';
import { Config } from './Config';

const port = 3000;

const config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json')).toString()) as Config;

getApp(config).listen(port, () => {
  console.log(`App is listening on ${port}\n`);
});
