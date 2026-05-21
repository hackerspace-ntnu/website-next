import { z } from 'zod';

function matrixDialogSchema(errorMsg: { invalidValue: string }) {
  return z.object({
    dontShowAgain: z.boolean({
      error: errorMsg.invalidValue,
    }),
  });
}

export { matrixDialogSchema };
