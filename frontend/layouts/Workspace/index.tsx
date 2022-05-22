import React, { useCallback, VFC, useState, useEffect } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch, useParams } from 'react-router';
import { AddButton, Channels, Chats, Header, LogOutButton, MenuScroll, ProfileImg, ProfileModal, RightMenu, WorkspaceButton, WorkspaceModal, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import useInput from '@hooks/useInput';
import { Link } from 'react-router-dom';
import { IChannel, IUser } from '@typings/db';
import Modal from '@components/Modal';
import { toast } from 'react-toastify';
import { Button, Input, Label } from '@pages/SignUp/styles';
import CreateChannelModal from '@components/CreateChannelModal';
import ChannelList from '@components/ChannelList';
import InviteWorkspaceModal from '@components/InviteWorkspaceModal';
import InviteChannelModal from '@components/InviteChannelModal';
import useSocket from '@hooks/useSocket';
import DMList from '@components/DMList';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: VFC = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newWorkspace, onChangeNewWorkspace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const { workspace } = useParams<{ workspace: string; }>();
  const { data: userData, mutate: revalidateUser } = useSWR<IUser | false>('/api/users', fetcher, {
    dedupingInterval: 2000
  });
  const {data: channelData } = useSWR<IChannel[]>(
    userData? `/api/workspaces/${workspace}/channels` : null, fetcher);
  const {data: memberData } = useSWR<IUser[]>(
    userData? `/api/workspaces/${workspace}/members` : null, fetcher);
  const [socket, disconnect] = useSocket(workspace);

  useEffect(() => {
    if(channelData && userData && socket) {
      console.log(socket);
      socket.emit('login', { id: userData.id, channels: channelData.map((v) => v.id)});
    }
  }, [socket, channelData, userData]);
  
  useEffect(() => {
    return () => {
      disconnect();
    }
  }, [workspace, disconnect]);

  const onLogout = useCallback(() => {
    axios.post('/api/users/logout').then(() => {
      //revalidate();
      revalidateUser();
    }).catch((error) => {
      console.dir(error);
      toast.error(error.response?.data, { position: 'bottom-center' });
    });
  },[]);

  const onCloseUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu(false);
  },[]);
  
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  },[]);
  
  const onClickCreateWorkspace = useCallback(() => {
    setShowCreateWorkspaceModal(true);
  },[]);

  const onCloseModal = useCallback(() => {
    setShowCreateWorkspaceModal(false);
    setShowCreateChannelModal(false);
    setShowInviteWorkspaceModal(false);
    setShowInviteChannelModal(false);
  },[]);

  const onCreateWorkspace = useCallback((e) => {
    e.preventDefault();
    if(!newWorkspace || !newWorkspace.trim()) return;
    if(!newUrl || !newUrl.trim()) return;
    axios.post('/api/workspaces', {
      workspace: newWorkspace,
      url: newUrl
    }, {
      withCredentials: true // 이게 있어야 내가 로그인 된 상태라는걸 쿠키 전달해서 알수있다.
    }).then(() => {
      revalidateUser();
      setShowCreateWorkspaceModal(false);
      setNewWorkspace('');
      setNewUrl('');
    }).catch((error) => {
      console.dir(error);
      toast.error(error.response?.data, { position: 'bottom-center' });
    });
  },[newWorkspace, newUrl]);

  const toggleWorkspaceModal = useCallback(() => {
    setShowWorkspaceModal((prev) => !prev);
  },[]);

  const onClickAddChannel = useCallback(() => {
    setShowCreateChannelModal(true);
  },[]);

  const onClickInviteWorkspace = useCallback(() => {
    setShowInviteWorkspaceModal(true);
  },[]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  },[]);

  if(!userData) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(userData.nickname, {s: '28px', d: 'wavatar'})} alt={userData.nickname} />
            {showUserMenu && (
              <Menu style={{ right: 0, top: 38 }} show={showUserMenu} onCloseModal={onCloseUserProfile}>
                <ProfileModal>
                  <img src={gravatar.url(userData.nickname, {s: '36px', d: 'wavatar'})} alt={userData.nickname}/>
                  <div>
                    <span id="profile-name">{userData.nickname}</span>
                    <span id="profile-active">Active</span>
                  </div>
                </ProfileModal>
                <LogOutButton onClick={onLogout}>logout</LogOutButton>
              </Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <WorkspaceWrapper>
        <Workspaces>
          {userData?.Workspaces?.map((ws) => {
            return (
              <Link key={ws.id} to={`/workspace/${ws.url}/channel/common`}>
                <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
              </Link>
            )
          })}
          <AddButton onClick={onClickCreateWorkspace}>+</AddButton>
        </Workspaces>
        <Channels>
          <WorkspaceName onClick={toggleWorkspaceModal}>
            Sleact
          </WorkspaceName>
          <MenuScroll>
            <Menu show={showWorkspaceModal} onCloseModal={toggleWorkspaceModal} style={{ top: 95, left: 80 }}>
              <WorkspaceModal>
                <h2>Sleat</h2>
                <button onClick={onClickInviteWorkspace}>invite user for workspace</button>
                <button onClick={onClickInviteChannel}>invite user for channel</button>
                <button onClick={onClickAddChannel}>add channel</button>
                <button onClick={onLogout}>logout</button>
              </WorkspaceModal>
            </Menu>
            <ChannelList />
            <DMList />
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/:workspace/channel/:channel" component={Channel}/>
            <Route path="/workspace/:workspace/dm/:id" component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
        <form onSubmit={onCreateWorkspace}>
          <Label id="workspace-label">
            <span>workspace name</span>
            <Input id="workspace" value={newWorkspace} onChange={onChangeNewWorkspace} />
          </Label>
          <Label id="workspace-url-label">
            <span>workspace url</span>
            <Input id="workspace-url" value={newUrl} onChange={onChangeNewUrl} />
          </Label>
          <Button type="submit">create</Button>
        </form>
      </Modal>
      <CreateChannelModal 
        show={showCreateChannelModal}
        onCloseModal={onCloseModal}
        setShowCreateChannelModal={setShowCreateChannelModal}
      />
      <InviteWorkspaceModal
        show={showInviteWorkspaceModal}
        onCloseModal={onCloseModal}
        setShowInviteWorkspaceModal={setShowInviteWorkspaceModal}
      />
      <InviteChannelModal
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
    </div>
  )
}

export default Workspace;