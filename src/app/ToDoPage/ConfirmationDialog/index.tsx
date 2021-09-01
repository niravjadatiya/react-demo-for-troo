import { Box, Button, Container, Dialog, Typography } from '@material-ui/core';
import { useAppDispatch } from '../../../redux/store';
import { deleteTodo, setIsDeleteConfirmOpen } from '../toDoSlice';
import useStyles from './styles';

const ConfirmationDialog = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();

    const handleClose = () => {
        dispatch(setIsDeleteConfirmOpen({ isDeleteConfirmOpen: false }));
    };

    const handleDelete = () => {
        dispatch(deleteTodo());
    };

    return (
        <Dialog open={true} data-testid='confirmationDialog'>
            <Container className={classes.container} >
                <Typography variant='h5'>Confirm Delete</Typography>
                <Typography variant='subtitle1'>
                    Are you sure you want to delete this To-Do?
                </Typography>
                <Box className={classes.btnsWrapper}>
                    <Button variant='contained' color='secondary' onClick={handleClose}>Cancel</Button>
                    <Button variant='contained' color='primary' onClick={handleDelete} data-testid='confirmationDialogDeleteBtn'>Delete</Button>
                </Box>
            </Container>
        </Dialog>
    );
};
export default ConfirmationDialog;
