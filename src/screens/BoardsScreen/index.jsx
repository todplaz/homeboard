import { useState, useEffect } from 'react';
import CreateBoardModal from './CreateBoardModal';
import Topbar from './Topbar';
import { Stack, Grid } from '@mui/material';
import NoBoards from './NoBoards';
import BoardCard from './BoardCard';
import useApp from '../../hooks/useApp';
import AppLoader from '../../components/layout/AppLoader';
import useStore from '../../store';


const BoardsScreen = () => {

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const { fetchBoards } = useApp();
  const { boards, areBoardsfetched } = useStore()


  useEffect(() => {
    if (!areBoardsfetched) fetchBoards(setLoading);
    else setLoading(false)
  }, []);

  if(loading) return <AppLoader />;

  return (
    <>
      <Topbar openModal={() => setShowModal(true)} />
      {showModal && <CreateBoardModal closeModal={() => setShowModal(false)} />}
      {/* <NoBoards /> */}

      {!boards.length ? (
        <NoBoards />
      ) : (
        <Stack mt={5} px={3}>
          <Grid container spacing={{xs:2, sm: 4}}>
            {boards.map((board) => (
              <BoardCard key={board.id} {...board} />
            ))}

          </Grid>
        </Stack>
      )}

    </>
  );
};

export default BoardsScreen;