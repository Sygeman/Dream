import React from 'react';
import {
  useChannelMessagesQuery,
  useChannelMessageCreatedSubscription,
} from './chat.api';
import { ChatMessages } from './components/chat-messages';
import { ChatBottom } from './bottom';
import { compactMessages } from './compactMessages';

const getContainerHeight = ({
  width,
  height,
  parentWidth = 256,
}: {
  width: number;
  height: number;
  parentWidth?: number;
}): number => {
  return (parentWidth * height) / width;
};

const formatedTenorGif = (tenorGif) => {
  if (!tenorGif) {
    return;
  }

  const { width, height } = tenorGif;

  const containerHeight = getContainerHeight({ width, height });

  return {
    ...tenorGif,
    containerHeight,
  };
};

export const Chat: React.FC<{ channelId: string }> = ({ channelId }) => {
  const messagesQuery = useChannelMessagesQuery({
    variables: { channelId },
    skip: !channelId,
  });

  useChannelMessageCreatedSubscription({
    variables: { channelId },
    skip: !channelId,
    onData: ({ data }) => {
      if (!data.data) return;

      const chatMessage = data.data.channelMessageCreated;

      messagesQuery.updateQuery((prev) => {
        if (
          prev.channelMessages.findIndex((c) => c.id === chatMessage.id) < 0
        ) {
          return {
            ...prev,
            channelMessages: [...prev.channelMessages.slice(-50), chatMessage],
          };
        }
      });
    },
  });

  const messages = messagesQuery.data?.channelMessages || [];

  return (
    <>
      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto py-4">
          {messages.length > 0 ? (
            <ChatMessages
              messages={compactMessages(messages).map((message) => ({
                authorName: message.user.name,
                authorAvatar: message.user.avatar,
                content: message.content,
                compact: message.compact,
                tenorGif: formatedTenorGif(message.tenorGif),
                createdAt: message.createdAt,
              }))}
            />
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden relative h-full">
              {[...Array(20).keys()].map((i) => (
                <div
                  key={i}
                  className="flex shrink-0 rounded h-11 bg-surface-dark mx-2 my-1 opacity-20 animate-pulse"
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <ChatBottom channelId={channelId} />
    </>
  );
};
