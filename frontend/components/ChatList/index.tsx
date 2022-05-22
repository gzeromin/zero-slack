import { IChat, IDM } from '@typings/db';
import React, { forwardRef, MutableRefObject, useCallback, VFC } from 'react';
import { ChatZone, Section, StickyHeader } from './styles';
import { Scrollbars } from 'react-custom-scrollbars';
import Chat from '@components/Chat';

interface Props {
  chatSections: {[key: string]: (IDM | IChat)[]};
  setSize: (f: (size: number) => number) => Promise<(IDM | IChat)[][] | undefined>;
  isReachingEnd: boolean;
}

const ChatList = forwardRef<Scrollbars, Props>(({ chatSections, setSize, isReachingEnd }, scrollRef) => {
  const onScroll = useCallback((values) => {
    if(values.scrollTop === 0 && !isReachingEnd) {
      console.log('가장 위');
      setSize((prevSize) => prevSize + 1).then(() => {
        //스크롤 위치 유지
        const current = (scrollRef as MutableRefObject<Scrollbars>)?.current;
        if(current) {
          current.scrollTop(current.getScrollHeight() - values.scrollHeight);
        }
      });
    }
  },[scrollRef, isReachingEnd, setSize]);

  return (
    <ChatZone>
      <Scrollbars autoHide ref={scrollRef} onScrollFrame={onScroll}>
        {Object.entries(chatSections).map(([date, chats]) => { //Object.entries -> 객체를 배열로 바꿈
          return (
            <Section className={`section-${date}`} key={date}>
              <StickyHeader>
                <button>{date}</button>
              </StickyHeader>
              {chats.map((chat) => (
                <Chat key={chat.id} data={chat}/>
              ))}
            </Section>
          )
        })}
      </Scrollbars>
    </ChatZone>
  );
});

export default ChatList;