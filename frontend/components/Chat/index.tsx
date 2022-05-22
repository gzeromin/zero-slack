import { IChat, IDM } from '@typings/db';
import React, { memo, useMemo, VFC } from 'react';
import { ChatWrapper } from './styles';
import gravatar from 'gravatar';
import dayjs from 'dayjs';
import regexifyString from 'regexify-string';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

interface Props {
  data: IDM | IChat;
}

const BACK_URL = 'http://localhost:3095';
const Chat: VFC<Props> = ({data}) => {
  const { workspace } = useParams<{ workspace: string; channel: string;}>();
  const user = 'Sender' in data ? data.Sender: data.User;

  // useMemo 값 캐싱
  const result = useMemo(() => {
    console.log(data)
    return data.content.startsWith('uploads\\') || data.content.startsWith('uploads/') ? (
      <img src={`${BACK_URL}/${data.content}`} style={{ maxHeight: 200 }} />
    ) : (
      regexifyString({
        input: data.content,
        // ¥d 숫자, +는 한 개 이상, ?는 0개나 1개, *는 0개 이상ßß
        // g는 모두 찾기
        // +는 1개 이상이면서 최대한 많이, +?는 1개 이상이면서 최대한 조금
        // | 또는
        // ¥n 줄바꿈ß
        pattern: /@\[(.+?)]\((\d+?)\)|\n/g,
        decorator(match, index) {
          const arr: string[] | null = match.match(/@\[(.+?)]\((\d+?)\)/)!;
          if(arr) {
            return (
              <Link key={match + index} to={`/workspace/${workspace}/dm/${arr[2]}`}>
                @{arr[1]}
              </Link>
            );
          }
          return <br key={index} />;
        }
      })
  )
    }, [workspace, data.content]);

  return (
    <ChatWrapper>
      <div className="chat-img">
        <img src={gravatar.url(user.email, {s: '36px', d: 'wavatar'})} alt={user.nickname} />
      </div>
      <div className="chat-text">
        <div className="chat-user">
          <b>{user.nickname}</b>
          <span>{dayjs(data.createdAt).format('h:mm A')}</span>
        </div>
        <p>{result}</p>
      </div>
    </ChatWrapper>
  );
};

export default memo(Chat);