import detectFreePort from 'detect-port';

import type { Task } from '../task';
import { exec } from '../utils/exec';

export const PORT = process.env.STORYBOOK_SERVE_PORT
  ? parseInt(process.env.STORYBOOK_SERVE_PORT, 10)
  : 6006;

export const dev: Task = {
  description: 'Run the sandbox in development mode',
  service: true,
  dependsOn: ['sandbox'],
  async ready() {
    return (await detectFreePort(PORT)) !== PORT;
  },
  async run({ sandboxDir, codeDir }, { dryRun, debug }) {
    const controller = new AbortController();
    const devCommand = `yarn storybook --port ${PORT}${
      process.env.SELECTED_TASK === 'dev' ? '' : ' --ci'
    }`;

    exec(
      devCommand,
      { cwd: sandboxDir },
      { dryRun, debug, signal: controller.signal as AbortSignal }
    ).catch((err) => {
      // If aborted, we want to make sure the rejection is handled.
      if (!err.killed) throw err;
    });
    await exec(`yarn wait-on http://localhost:${PORT}`, { cwd: codeDir }, { dryRun, debug });

    return controller;
  },
};
