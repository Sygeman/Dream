import React from 'react';
import { useModal } from '@dream/utils-old/use-modal';
import { Modal } from '@dream/components/modal';
import { AuthButtonTwitch, AuthButtonSpotify } from '../button';

export const LoginModal = () => {
  const modalProps = useModal();

  return (
    <Modal id="authModal" minimal {...modalProps}>
      <div className="flex flex-col px-4 py-2">
        <AuthButtonTwitch />
        <AuthButtonSpotify />
      </div>
    </Modal>
  );
};
