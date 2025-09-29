import * as migration_20250925_181955 from './20250925_181955';
import * as migration_20250929_043406 from './20250929_043406';
import * as migration_20250929_044749 from './20250929_044749';

export const migrations = [
  {
    up: migration_20250925_181955.up,
    down: migration_20250925_181955.down,
    name: '20250925_181955',
  },
  {
    up: migration_20250929_043406.up,
    down: migration_20250929_043406.down,
    name: '20250929_043406',
  },
  {
    up: migration_20250929_044749.up,
    down: migration_20250929_044749.down,
    name: '20250929_044749'
  },
];
