import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CommunityIcon } from '@dream/icons/community';
import { ProfileIcon } from '@dream/icons/profile';

const CommunityInAppPanel: React.FC<{ title: string; name: string }> = ({
  title,
  name,
}) => {
  const router = useRouter();
  const community = router.query?.community;

  return (
    <Link href={`/${name}`}>
      <div
        className={`flex flex-shrink-0 items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90 hover:bg-surface-light ${
          name === community && 'bg-surface-light'
        }`}
      >
        <div className="rounded-full bg-background h-32px w-32px flex items-center justify-center">
          <span className="text-gray-400 text-sm">{title}</span>
        </div>
      </div>
    </Link>
  );
};

export const AppPanel = () => {
  return (
    <div className="h-screen flex flex-col w-48px bg-surface border-r border-background overflow-hidden">
      <Link href="/">
        <div className="flex items-center justify-center w-48px h-48px cursor-pointer hover:opacity-90">
          <div className="flex justify-center items-center h-32px w-32px">
            <span className="text-text">D</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto">
          {[...Array(50).keys()].map((k) => (
            <CommunityInAppPanel
              key={k}
              name={`community-${k}`}
              title={`${k}`}
            />
          ))}
        </div>
      </div>

      <div className="flex justify-center py-2">
        <CommunityIcon />
      </div>

      <div className="flex flex-1 w-full overflow-hidden">
        <div className="flex flex-col w-full max-h-max overflow-y-auto">
          {[...Array(3).keys()].map((k) => (
            <CommunityInAppPanel key={k} name={`user-${k}`} title={`${k}`} />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-48px h-48px bg-surface border-t border-background">
        {/* <div className="rounded-full bg-background h-32px w-32px"></div> */}
        <ProfileIcon />
      </div>
    </div>
  );
};
