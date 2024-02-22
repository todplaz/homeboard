import { Grid } from '@mui/material';
import BoardTab from './BoardTab';
import AddTaskModal from './AddTaskModal';
import { useCallback, useState } from 'react';
import useApp from '../../hooks/useApp';
import useStore from '../../store';
import { DragDropContext } from 'react-beautiful-dnd';
import AppLoader from '../../components/layout/AppLoader';
import ShiftTaskModal from './ShiftTaskModal';


export const statusMap = {
  todos: 'Todos',
  inProgress: 'In Progress',
  completed: 'Completed'
};

// const sleep = (ms= 1000) => new Promise( r => setTimeout( r, ms));

const BoardInterface = ({ boardData, boardId, updateLastUpdated }) => {

  const [loading, setLoading] = useState(false);
  const [shiftTask, setShiftTask] = useState(null);
  const [addTaskTo, setAddTaskTo] = useState('');
  const [tabs, setTabs] = useState(structuredClone(boardData));
  const { updateBoardData } = useApp()
  const { setToastr } = useStore()

  const handleOpenAddTaskModal = useCallback(
    (status) => setAddTaskTo(status), 
    []
  );
  
  const handleOpenShiftTaskModal = useCallback(
    (task) => setShiftTask(task), 
    []
  );

  const handleShiftTask = async newStatus => {
    
    const oldStatus = shiftTask.status
    if (newStatus === oldStatus) return setShiftTask(null);
    const dClone = structuredClone(tabs)

    //remove the element from array 1
    const [task] = dClone[oldStatus].splice(shiftTask.index, 1)

    //Add it to the array 2
    dClone[newStatus].unshift(task);

    try {
      await handleUpdateBoardData(dClone);
      setShiftTask(null)
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBoardData = async (dClone) => {
    setLoading(true);
    await updateBoardData(boardId, dClone);
    setTabs(dClone);
    updateLastUpdated();
    setToastr('Board updated!')
  }

  const handleRemoveTask = useCallback(async (tab, taskId) => {
    const dClone = structuredClone(tabs);
    const taskIdx = dClone[tab].findIndex(t => t.id === taskId)
    dClone[tab].splice(taskIdx, 1)

    try {
      await handleUpdateBoardData(dClone);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false)
    }
  }, [tabs])

  const handleAddTask = async (text) => {
    if (!text.trim()) return setToastr('Task cannot be empty!');
    const dClone = structuredClone(tabs)
    dClone[addTaskTo].unshift({ text, id: crypto.randomUUID()});

    try {
      await handleUpdateBoardData(dClone);
      setAddTaskTo('');
    } 
      catch (err) {
      console.error(err);
    } 
      finally {
      setLoading(false)
    }
  }
console.log(tabs);

  const handleDnd = async ({ source, destination }) => {
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId && 
      source.index === destination.index
      ) 
      return;

      const dClone = structuredClone(tabs);

      // Remove task from tab 1
      const [draggedTask] = dClone[source.droppableId].splice(source.index, 1);

      // Add it to the tab 2
      dClone[destination.droppableId].splice(destination.index, 0, draggedTask);

      try {
        await handleUpdateBoardData(dClone);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false)
      }

  }

  if (loading) return <AppLoader />

  return (
    <>
      {!!shiftTask && (
        <ShiftTaskModal 
          shiftTask={handleShiftTask}
          task={shiftTask} 
          onClose={() => setShiftTask(null)}
        />
      )}
      {!!addTaskTo && (
        <AddTaskModal 
          tabName={statusMap[addTaskTo]} 
          onClose={() => setAddTaskTo('')} 
          addTask={handleAddTask}
          loading={loading}
        />
      )}
      <DragDropContext onDragEnd={handleDnd}>
        <Grid container px={4} mt={2} spacing={2}>
          {Object.keys(statusMap).map((status) => (
            <BoardTab 
              key={status} 
              status = {status}
              tasks={tabs[status]}
              name={statusMap[status]} 
              openAddTaskModal={handleOpenAddTaskModal}
              openShiftTaskModal={handleOpenShiftTaskModal}
              removeTask={handleRemoveTask}
            />
          ))}
        </Grid>
      </DragDropContext>
    </>
  );
};

export default BoardInterface;