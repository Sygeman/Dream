import {
  useWaitlistYoutubeQueueQuery,
  useWaitlistYoutubeQueueUpdatedSubscription,
} from './mode-waitlist.api';
import { TrackFromList } from './components/track-from-list';
import { useCommunityChannel } from '@dream/mono-use-community-channel';

export const ChannelYoutubeModeQueue = () => {
  const { channelId } = useCommunityChannel();

  const queueQuery = useWaitlistYoutubeQueueQuery({
    variables: { channelId },
    skip: !channelId,
    fetchPolicy: 'network-only',
  });

  useWaitlistYoutubeQueueUpdatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onData: () => {
      queueQuery.refetch();
    },
  });

  const queueItems = queueQuery?.data?.waitlistYoutubeQueue?.items || [];

  return (
    <>
      {queueItems.map((item) => (
        <div key={item.data.id}>
          <TrackFromList
            cover={item.data.cover}
            artists={''}
            title={item.data.title}
            avatar={item.data.author.avatar}
            info={item.data.author.name}
          />
        </div>
      ))}
    </>
  );
};
