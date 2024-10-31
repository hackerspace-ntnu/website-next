import { auth } from '@/server/auth';
import { db } from '@/server/db';
import { s3 } from '@/server/s3';

type TRPCContext = {
  db: typeof db;
  auth: typeof auth;
  s3: typeof s3;
};

function createContext(): TRPCContext {
  return {
    auth,
    db,
    s3,
  };
}

export { createContext, type TRPCContext };
