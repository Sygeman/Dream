'use server';

import { getCurretUserId } from 'apps/client/helpers/get-current-user';
import { prisma } from 'apps/client/libs/prisma';
import { getYoutubeVideo } from 'apps/client/libs/youtube';

export const skipVideoAction = async (payload: {
  communityName: string;
  channelName: string;
}) => {
  console.log('skipVideo', payload);
  // Set next video from queue
  // return setVideo({ channelId, manualSkip: true });
};
