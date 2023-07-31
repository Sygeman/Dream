import { getServerSession } from 'next-auth';
import { authOptions } from 'apps/client/config/next-auth';

export const getCurretUserId = async () => {
  const session = await getServerSession(authOptions);
  return session?.user.id;
};

export const checkIsUser = async () => {
  const session = await getServerSession(authOptions);
  return !!session?.user.id;
};
