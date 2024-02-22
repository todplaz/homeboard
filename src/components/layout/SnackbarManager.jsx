import { Snackbar } from "@mui/material";
import useStore from '../../store';


const SnackbarManager = () => {

  const { toastrMsg, setToastr } = useStore();

  return (
    <Snackbar message={toastrMsg} open={!!toastrMsg} autoHideDuration={50000} onClose={() => setToastr('')} />
  );
};

export default SnackbarManager;