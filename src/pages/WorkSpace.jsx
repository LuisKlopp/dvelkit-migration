import styled from 'styled-components';
import { getCookieToken } from '../Cookie';
import {
  useGetWorkspacesQuery,
  useDeleteWorkSpacesMutation,
} from '../redux/modules/workspaces';
import CreateCard from '../components/CreateCard';
import SpaceCard from '../components/SpaceCard.jsx';
import SpaceHeader from '../components/SpaceHeader';
import WorkSpaceErrorModal from '../Modal/error';
import CreateSpaceModal from '../Modal/CreateSpaceModal';
import React, { useEffect, useState } from 'react';

function WorkSpace() {
  const { data, error, isLoading, refetch } = useGetWorkspacesQuery();
  const [deleteWorkSpaces] = useDeleteWorkSpacesMutation();
  const workspaces = data?.data;
  const cookies = getCookieToken();
  const [createOpen, setCreateOpen] = useState(false);
  const [deleteButton, setDeletebutton] = useState(true);

  useEffect(() => {
    refetch();
  }, [data, refetch]);

  return (
    <>
      {!cookies ? (
        <WorkSpaceErrorModal />
      ) : (
        <StWrapper>
          <SpaceHeader />
          <CardWrapper>
            <CreateCard createOpen={createOpen} setCreateOpen={setCreateOpen} />
            {error ? (
              <>Oh no, there was an error</>
            ) : isLoading ? (
              <>Loading...</>
            ) : data ? (
              <>
                {workspaces?.map((data, i) => {
                  return (
                    <div style={{ width: '70%' }} key={data.workspaces.id}>
                      <SpaceCard
                        data={data}
                        width='100%'
                        deleteButton={deleteButton}
                        deleteWorkSpaces={deleteWorkSpaces}
                      />
                    </div>
                  );
                })}
              </>
            ) : null}
          </CardWrapper>
          {}
        </StWrapper>
      )}
      {createOpen && (
        <CreateSpaceModal
          onClose={() => {
            setCreateOpen(false);
          }}
        ></CreateSpaceModal>
      )}
    </>
  );
}

export default WorkSpace;

const StWrapper = styled.div`
  width: 100%;
  min-height: 90vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardWrapper = styled.div`
  width: 90%;
  min-height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 50px;
`;
