import React, { useEffect, useRef, useState } from 'react';
import { dateDistanceInWordsToNow } from '@dream/utils-old/date';
import { splitTextToEmojiArray } from '@dream/utils-old/emoji';
import { GifContainer } from './gif';

interface IProps {
  id?: string;
  name: string;
}

export const Emoji: React.FC<IProps> = ({ name, id }) => (
  <span className="h-6 w-6">
    <img
      className="object-contain h-6 w-6"
      alt={`:${name}: `}
      src={`/emojis/${id ? id : name}.gif`}
    />
  </span>
);

const renderMessageText = (text: string) => {
  return splitTextToEmojiArray(text).map((elm, index) => {
    if (elm.type === 'text') {
      return <React.Fragment key={index}>{elm.value}</React.Fragment>;
    }

    if (elm.type === 'emoji' && elm.name) {
      return <Emoji key={index} name={elm.name} id={elm.id} />;
    }
  });
};

export const ChatMessage = ({
  authorName,
  authorAvatar,
  content,
  compact = false,
  tenorGif,
  createdAt,
}) => {
  const ref = useRef(null);

  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const rootRef =
      ref.current.parentNode.parentNode.parentNode.parentNode.parentNode;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
      },
      {
        root: rootRef,
      }
    );

    observer.observe(ref.current);
    return () => {
      observer.disconnect();
    };
  });

  return (
    <div ref={ref} className="px-2 w-full relative overflow-hidden text-sm">
      {!compact && (
        <div className="flex items-center w-full pt-1">
          <div className="flex items-center justify-center rounded-full cursor-pointer">
            {authorAvatar ? (
              <img
                className="h-4 w-4 rounded-full"
                src={authorAvatar}
                alt={authorName}
              />
            ) : (
              <div className="h-4 w-4 rounded-full bg-background" />
            )}
          </div>
          <div className="font-medium text-sm text-white ml-2">
            {authorName}
          </div>
          <div className="text-accent text-xs ml-2">
            {dateDistanceInWordsToNow(createdAt)}
          </div>
        </div>
      )}
      <div className="relative">
        <div className="overflow-hidden text-accent break-words ml-6 flex flex-wrap">
          {tenorGif ? (
            <div className="p-1 pr-3 w-full ">
              <GifContainer
                tenorGif={tenorGif}
                isIntersecting={isIntersecting}
              />
            </div>
          ) : (
            renderMessageText(content)
          )}
        </div>
      </div>
    </div>
  );
};
