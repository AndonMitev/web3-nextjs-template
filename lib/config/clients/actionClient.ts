import { jwtVerify } from 'jose';
import { DEFAULT_SERVER_ERROR_MESSAGE, createSafeActionClient } from 'next-safe-action';
import { cookies } from 'next/headers';
import { z } from 'zod';
import { env } from '../env';
import { JWT_CONFIG } from '@/lib/constants';

class ActionError extends Error {}

async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(env.JWT_SECRET_KEY), {
      issuer: JWT_CONFIG.ISSUER,
      audience: JWT_CONFIG.AUDIENCE,
    });
    return payload;
  } catch (error) {
    console.error('Error verifying JWT:', error);
    throw new ActionError('Invalid token');
  }
}

export const actionClient = createSafeActionClient({
  handleReturnedServerError(e) {
    if (e instanceof ActionError || e instanceof Error) {
      return e.message;
    }
    return DEFAULT_SERVER_ERROR_MESSAGE;
  },
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
}).use(async ({ next }) => {
  const jwtCookie = cookies().get('jwt');

  if (!jwtCookie) {
    throw new ActionError('JWT not found!');
  }

  try {
    const payload = await verifyJwt(jwtCookie.value);

    return next({ ctx: { jwt: jwtCookie.value, payload } });
  } catch (error) {
    throw new ActionError('Invalid or expired token');
  }
});
// .use(async ({ next, clientInput, metadata }) => {
//   const startTime = performance.now();
//   const startDate = new Date().toISOString();
//   const boxTop = `┌${'─'.repeat(50)}┐`;
//   const boxBottom = `└${'─'.repeat(50)}┘`;

//   // Start of middleware logging
//   console.log(chalk.cyan(boxTop));
//   console.log(
//     chalk.cyan('│') + chalk.yellow.bold(` Action Start: ${metadata.actionName}`.padEnd(49)) + chalk.cyan('│'),
//   );
//   console.log(chalk.cyan('│') + chalk.gray(` Time: ${startDate}`.padEnd(49)) + chalk.cyan('│'));
//   console.log(chalk.cyan(boxBottom));

//   // Action execution
//   const result = await next({ ctx: null });

//   // Client input logging
//   console.log(chalk.magentaBright('\nClient input ->'), clientInput);

//   // Result logging
//   if (result.success) {
//     console.log(chalk.green('\nSUCCESS ->'), result);
//   } else {
//     console.log(chalk.red('\nERROR ->'), result);
//   }

//   const endTime = performance.now();
//   const endDate = new Date().toISOString();
//   const duration = formatActionDuration(startTime, endTime);

//   // End of middleware logging
//   console.log(chalk.cyan(boxTop));
//   console.log(
//     chalk.cyan('│') + chalk.yellow.bold(` Action End: ${metadata.actionName}`.padEnd(49)) + chalk.cyan('│'),
//   );
//   console.log(chalk.cyan('│') + chalk.gray(` Time: ${endDate}`.padEnd(49)) + chalk.cyan('│'));
//   console.log(chalk.cyan('│') + chalk.green(` Duration: ${duration}`.padEnd(49)) + chalk.cyan('│'));
//   console.log(chalk.cyan(boxBottom));

//   return result;
// });