
import Modal from '@components/Modal';
import useInput from '@hooks/useInput';
import { Button, Input, Label } from '@pages/SignUp/styles';
import { IChannel, IUser } from '@typings/db';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { VFC, useCallback } from 'react';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import useSWR from 'swr';

interface Props {
  show: boolean;
  onCloseModal: () => void;
  setShowInviteChannelModal: (flag: boolean) => void;
}

const InviteChannelModal: VFC<Props> = ({ show, onCloseModal, setShowInviteChannelModal }) => {
  const [newMember, onChangeNewMember, setNewMember] = useInput('');
  const {workspace, channel} = useParams<{workspace: string; channel: string;}>();
  const {data: userData} = useSWR<IUser | false>('/api/users', fetcher);
  const {mutate: revalidateMember} = useSWR<IChannel[]>(
    userData && channel? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher);
  const onInviteMember = useCallback((e) => {
    e.preventDefault();

    if(!newMember || !newMember.trim()) {
      return;
    }
    
    axios.post(`/api/workspaces/${workspace}/channels/${channel}/members`, {
      email: newMember
    }).then((response) => {
      setShowInviteChannelModal(false);
      revalidateMember();
      setNewMember('');
    }).catch((error) => {
      console.dir(error);
      toast.error(error.response?.data, { position: 'bottom-center' });
    });
  }, [newMember]);

  return (
    <Modal show={show} onCloseModal={onCloseModal}>
      <form onSubmit={onInviteMember}>
        <Label id="member-label">
          <span>invite channel member</span>
          <Input id="member" value={newMember} onChange={onChangeNewMember} />
        </Label>
        <Button type="submit">invite</Button>
      </form>
    </Modal>
  )
}

export default InviteChannelModal;