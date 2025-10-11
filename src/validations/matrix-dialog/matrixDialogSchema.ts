import { z } from 'zod';

function matrixDialogSchema(errorMsg: { invalidValue: string }) {
  return z.object({
    dontShowAgain: z.boolean({
      message: errorMsg.invalidValue,
    }),
  });
}

export { matrixDialogSchema };
