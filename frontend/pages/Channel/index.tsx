import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Container, DragOver, Header } from './styles';
import axios from 'axios';
import Scrollbars from 'react-custom-scrollbars';
import { useParams } from 'react-router';
import fetcher from '@utils/fetcher';
import useSWR, { mutate, useSWRInfinite } from 'swr';
import useInput from '@hooks/useInput';
import { IChannel, IChat, IUser } from '@typings/db';
import useSocket from '@hooks/useSocket';
import makeSection from '@utils/makeSection';
import ChatList from '@components/ChatList';
import ChatBox from '@components/ChatBox';
import InviteChannelModal from '@components/InviteChannelModal';


const Channel = () => {
  const { workspace, channel } = useParams<{ workspace: string; channel: string;}>();
  const { data: myData } = useSWR(`/api/users`, fetcher);
  const [chat, onChangeChat, setChat] = useInput('');
  const { data: channelData } = useSWR<IChannel>(`/api/workspaces/${workspace}/channels/${channel}`, fetcher);
  const { data: chatData, mutate: mutateChat, revalidate, setSize } = useSWRInfinite<IChat[]>(
    (index) => `/api/workspaces/${workspace}/channels/${channel}/chats?perPage=20&page=${index + 1}`, fetcher
  );
  const { data: channelMembersData } = useSWR<IUser[]>(
    myData ? `/api/workspaces/${workspace}/channels/${channel}/members` : null, fetcher
  );
  const [socket] = useSocket(workspace);
  const isEmpty = chatData?.[0]?.length === 0;
  const isReachingEnd = isEmpty || (chatData && chatData[chatData.length - 1]?.length < 20) || false;
  const scrollbarRef = useRef<Scrollbars>(null);
  const [showInviteChannelModal, setShowInviteChannelModal] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const onSubmitForm = useCallback((e) => {
    e.preventDefault();
    console.log(chat);
    if (chat?.trim() && chatData && channelData) {
      const savedChat = chat;
      mutateChat((prevChatData) => {
        prevChatData?.[0].unshift({
          id: (chatData[0][0]?.id || 0) + 1,
          content: savedChat,
          UserId: myData,
          User: myData,
          ChannelId: channelData.id,
          Channel: channelData,
          createdAt: new Date()
        });
        return prevChatData;
      }, false).then(() => {
        localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
        setChat('');
        if(scrollbarRef.current) {
          scrollbarRef.current?.scrollToBottom();
        }
      });
      axios.post(`/api/workspaces/${workspace}/channels/${channel}/chats`, {
        content: savedChat
      }).then(() => {
        revalidate();
      }).catch(console.error);
    }
  },[chat, chatData, myData, channelData, workspace, channel, mutateChat, setChat]);

  const onMessage = useCallback((data: IChat) => {
    if(data.Channel.name === channel && (data.content.startsWith('upload¥¥') || data.UserId !== myData?.id)) {
      mutateChat((chatData) => {
        chatData?.[0].unshift(data);
        return chatData;
      }, false).then(() => {
        if(scrollbarRef.current) {
          if(scrollbarRef.current.getScrollHeight() <
            scrollbarRef.current.getClientHeight() + scrollbarRef.current.getScrollTop() + 150
          ) {
            console.log('scrollToBottom!', scrollbarRef.current?.getValues());
            setTimeout(() => {
              scrollbarRef.current?.scrollToBottom();
            }, 50);
          }
        }
      });
    }
  },[channel, myData]);

  useEffect(() => {
    socket?.on('message', onMessage);
    return () => {
      socket?.off('message', onMessage);
    }
  }, [socket, onMessage]);

  useEffect(() => {
    if(chatData?.length === 1) {
      console.log('toBottomWhenLoaded', scrollbarRef.current);
      setTimeout(() => {
        console.log('scrollbar', scrollbarRef.current);
        scrollbarRef.current?.scrollToBottom();
      }, 500);
    }
  }, [chatData]);

  useEffect(() => {
    localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());  
  }, [workspace, channel]);

  const onClickInviteChannel = useCallback(() => {
    setShowInviteChannelModal(true);
  },[]);

  const onCloseModal = useCallback(() => {
    setShowInviteChannelModal(false);
  },[]);

  const onChangeFile = useCallback((e) => {
    //input으로 열어서 파일 첨부하고 싶을때 사용하기
    const formData = new FormData();
    if(e.target.files) {
      for(let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i].getAsFile();
        console.log('...files[' + i + '].name = ' + file.name);
        formData.append('image', file);
      }
    }
    axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {});
  },[]);

  const onDrop = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    const formData = new FormData();
    if(e.dataTransfer.items) {
      for(let i = 0; i < e.dataTransfer.items.length; i++) {
        if(e.dataTransfer.items[i].kind === 'file') {
          const file = e.dataTransfer.items[i].getAsFile();
          console.log(e, '... file[' + i + '].name = ' + file.name);
          formData.append('image', file);
        }
      }
    } else {
      for(let i = 0; i < e.dataTransfer.files.length; i++) {
        console.log(e, '...file[' + i + '].name = ' + e.dataTransfer.files[i].name);
        formData.append('image', e.dataTransfer.files[i]);
      }
    }
    axios.post(`/api/workspaces/${workspace}/channels/${channel}/images`, formData).then(() => {
      setDragOver(false);
      localStorage.setItem(`${workspace}-${channel}`, new Date().getTime().toString());
      mutateChat();
    })
  },[mutateChat, workspace, channel]);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    console.log(e);
    setDragOver(true);
  },[]);

  if(!myData) {
    return null;
  }

  const chatSections = makeSection(chatData ? chatData.flat().reverse() : []);

  return (
    <Container onDrop={onDrop} onDragOver={onDragOver}>
      <Header>
        <span>#{channel}</span>
        <div className="header-right">
          <span>{channelMembersData?.length}</span>
          <button
            onClick={onClickInviteChannel}
            className="c-button-unstyled p-ia__view_header__button"
            aria-label="Add people to #react-native"
            data-sk="tooltip_parent"
            type="button"
          >
            <i className="c-icon p-ia__view_header__button_icon c-icon--add-user" aria-hidden="true" />
          </button>
        </div>
      </Header>
      <ChatList chatSections={chatSections} ref={scrollbarRef} setSize={setSize} isReachingEnd={isReachingEnd} />
      <ChatBox chat={chat} onChangeChat={onChangeChat} onSubmitForm={onSubmitForm} />
      <InviteChannelModal 
        show={showInviteChannelModal}
        onCloseModal={onCloseModal}
        setShowInviteChannelModal={setShowInviteChannelModal}
      />
      { dragOver && <DragOver>uploads!</DragOver> }
    </Container>
  )
}

export default Channel;