import * as migration_20250925_181955 from './20250925_181955';
import * as migration_20250929_060416 from './20250929_060416';
import * as migration_20250929_061229 from './20250929_061229';
import * as migration_20250929_174551 from './20250929_174551';
import * as migration_20250929_182101 from './20250929_182101';

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
    name: '20250929_061229',
  },
  {
    up: migration_20250929_174551.up,
    down: migration_20250929_174551.down,
    name: '20250929_174551',
  },
  {
    up: migration_20250929_182101.up,
    down: migration_20250929_182101.down,
    name: '20250929_182101'
  },
];
