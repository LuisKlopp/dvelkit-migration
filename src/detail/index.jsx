import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';
import {
  useGetMainWorkSpacesQuery,
  useGetMemberListQuery,
} from '../redux/modules/workspaces';
import useGetUser from '../common/hooks/useGetUser';
import Sidebar from './components/Sidebar';
import useChangeMenu from './hooks/useChangeMenu';
import Home from './workspaces/Home';
import Notice from './workspaces/Notice';
import Document from './workspaces/Document';
import Schedule from './workspaces/Schedule';
import Contacts from './workspaces/Contacts';
import ProjectInfo from './workspaces/ProjectInfo';
import Chatting from '../components/Chatting';
import { getCookieToken } from '../Cookie';
import * as S from './style';

const headers = {
  token: getCookieToken(),
};

const sockJS = new SockJS(`${process.env.REACT_APP_BASE_URL}/stomp/chat`);
const stompClient = Stomp.over(sockJS);
stompClient.heartbeat.outgoing = 20000;
stompClient.heartbeat.incoming = 20000;
stompClient.connect(headers, () => {});

stompClient.debug = () => {};

export default function WorkspaceDetailPage() {
  const { onClickMenu, menu } = useChangeMenu();
  const navigate = useNavigate();
  const id = Number(useParams().id);
  const { data, isLoading } = useGetMainWorkSpacesQuery(id);
  const {
    data: data_1,
    isLoading: isLoading_1,
    error: error_1,
  } = useGetMemberListQuery(id);

  const { user } = useGetUser();

  const title = data?.data.workspaces.title;
  const [isOpen, setIsOpen] = useState(true);
  const cookie = getCookieToken();

  useEffect(() => {
    if (!cookie) {
      alert('로그인 해주세요!');
      navigate('/');
    }
  }, [cookie, navigate]);

  const messageBoxRef = useRef();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  //---------------------------------------------------------------

  const SelectWorkspaceMenu = {
    home: Home,
    notice: Notice,
    document: Document,
    schedule: Schedule,
    contacts: Contacts,
    projectInfo: ProjectInfo,
  }[menu];

  // if (!(data_1 && user)) return null;
  return (
    <S.Wrapper>
      <Sidebar
        onClickMenu={onClickMenu}
        handleClick={handleClick}
        menu={menu}
      />
      <S.Projects>
        <SelectWorkspaceMenu
          id={id}
          data={data}
          user={user}
          data_1={data_1}
          error_1={error_1}
          isLoading_1={isLoading_1}
          // refetch={refetch}
        />
      </S.Projects>

      {isOpen && (
        <Chatting
          id={id}
          title={title}
          stompClient={stompClient}
          headers={headers}
          messageBoxRef={messageBoxRef}
          user={user}
        />
      )}
    </S.Wrapper>
  );
}