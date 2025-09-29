import * as migration_20250925_181955 from './20250925_181955';
import * as migration_20250929_043406 from './20250929_043406';

export const migrations = [
  {
    up: migration_20250925_181955.up,
    down: migration_20250925_181955.down,
    name: '20250925_181955',
  },
  {
    up: migration_20250929_043406.up,
    down: migration_20250929_043406.down,
    name: '20250929_043406'
  },
];
