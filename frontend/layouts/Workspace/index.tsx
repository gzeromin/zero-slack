import React, { useCallback, FC, useState } from 'react';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { Redirect, Route, Switch } from 'react-router';
import { Channels, Chats, Header, MenuScroll, ProfileImg, RightMenu, WorkspaceName, Workspaces, WorkspaceWrapper } from './styles';
import gravatar from 'gravatar';
import loadable from '@loadable/component';
import Menu from '@components/Menu';
import useInput from '@hooks/useInput';

const Channel = loadable(() => import('@pages/Channel'));
const DirectMessage = loadable(() => import('@pages/DirectMessage'));

const Workspace: FC = ({children}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showCreateWorkspaceModal, setShowCreateWorkspaceModal] = useState(false);
  const [showInviteWorkspaceModal, setShowInviteWorkspaceModal] = useState(false);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(false);
  const [showCreateChannelModal, setShowCreateChannelModal] = useState(false);
  const [newWorkspace, onChangeNewWorkpace, setNewWorkspace] = useInput('');
  const [newUrl, onChangeNewUrl, setNewUrl] = useInput('');

  const { data, error, revalidate, mutate } = useSWR('/api/users', fetcher);
  
  const onLogout = useCallback(() => {
    axios.post('/api/users/logout', null, {
      withCredentials: true
    }). then(() => {
      //revalidate();
      mutate(false);
    });
  },[]);

  const onCloseUserProfile = useCallback((e) => {
    e.stopPropagation();
    setShowUserMenu(false);
  },[]);
  
  const onClickUserProfile = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  },[]);
  

  if(!data) {
    return <Redirect to="/login" />
  }

  return (
    <div>
      <Header>
        <RightMenu>
          <span onClick={onClickUserProfile}>
            <ProfileImg src={gravatar.url(data.nickname, {s: '28px', d: 'wavatar'})} alt={data.nickname} />
            {showUserMenu && (
              <Menu>profile menu</Menu>
            )}
          </span>
        </RightMenu>
      </Header>
      <button onClick={onLogout}>logout</button>
      <WorkspaceWrapper>
        <Workspaces>
          test
        </Workspaces>
        <Channels>
          <WorkspaceName>
            Sleact
          </WorkspaceName>
          <MenuScroll>
            menuscroll
          </MenuScroll>
        </Channels>
        <Chats>
          <Switch>
            <Route path="/workspace/channel" component={Channel}/>
            <Route path="/workspace/dm" component={DirectMessage}/>
          </Switch>
        </Chats>
      </WorkspaceWrapper>
      { children }
    </div>
  )
}

export default Workspace;