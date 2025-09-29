import * as migration_20250925_181955 from './20250925_181955';
import * as migration_20250929_060416 from './20250929_060416';
import * as migration_20250929_061229 from './20250929_061229';

export const migrations = [
  {
    up: migration_20250925_181955.up,
    down: migration_20250925_181955.down,
    name: '20250925_181955',
  },
  {
    up: migration_20250929_060416.up,
    down: migration_20250929_060416.down,
    name: '20250929_060416',
  },
  {
    up: migration_20250929_061229.up,
    down: migration_20250929_061229.down,
    name: '20250929_061229'
  },
];
