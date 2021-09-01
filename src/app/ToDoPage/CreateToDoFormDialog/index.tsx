import { Box, Button, Checkbox, Dialog, FormControl, FormControlLabel, FormLabel, InputLabel, MenuItem, Radio, RadioGroup, Select, Slider, TextField, Typography } from '@material-ui/core';
import { BaseSyntheticEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import { saveTodo, setIsCreateFormOpen, updateTodo } from '../toDoSlice';
import useStyles from './styles';

// since we are using redux we don't require props to pass but
// We can also create interface and pass props something like this:

// interface IProps {
//     toggleCreateModal: (isOpen: boolean) => any;
// }
// const CreateToDoFormDialog = ({ toggleCreateModal }: IProps) => {
//
interface IForm {
    id: number | null;
    userName: string;
    gender: 'Male' | 'Female';
    hobby: Array<string>;
    age: number;
    date: string;
    taskName: string;
    status: 'Active' | 'InActive';
}

const CreateToDoFormDialog = () => {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const { selectedTodo } = useAppSelector((state: any) => state.toDo);
    const [emailError, setEmailError] = useState('');

    const [formValues, setFormValues] = useState<IForm>({
        id: selectedTodo ? selectedTodo.id : null,
        userName: selectedTodo ? selectedTodo.userName : '',
        gender: selectedTodo ? selectedTodo.gender : 'Male',
        hobby: selectedTodo ? selectedTodo.hobby : [],
        age: selectedTodo ? selectedTodo.age : 18,
        date: selectedTodo ? selectedTodo.date : (new Date()).toISOString().substring(0, 10),
        taskName: selectedTodo ? selectedTodo.taskName : '',
        status: selectedTodo ? selectedTodo.status : 'Active',
    });

    const handleInputChange = (e: BaseSyntheticEvent) => {
        const inputName = e.target.name;
        let inputVal: any = '';

        switch (inputName) {
            case 'userName':
                inputVal = e.target.value;
                const regexMaxChar = /^.{0,15}$/;
                const regexOnlyAlphabets = /^[a-zA-Z][a-zA-Z ]*$/;
                const isMaxChar = regexMaxChar.test(inputVal);
                const isAlphabetsOnly = regexOnlyAlphabets.test(inputVal);
                let str = '';
                if (!isAlphabetsOnly) {
                    str += 'Only Alphabets allowed! ';
                }
                if (!isMaxChar) {
                    str += 'Name should not more than 15 characters long!';
                }
                setEmailError(str);
                break;

            case 'hobby':
                inputVal = e.target.checked;
                const hobby = [...formValues.hobby];
                if (inputVal) {
                    hobby.push(e.target.value);
                } else {
                    const index = hobby.indexOf(e.target.value);
                    hobby.splice(index, 1);
                }
                inputVal = hobby;
                break;

            case 'gender':
            case 'taskName':
            case 'date':
                inputVal = e.target.value;
                break;

            default:
                break;
        }
        setFormValues({ ...formValues, [inputName]: inputVal });
    };

    const handleSelectChange = (e: BaseSyntheticEvent) => {
        setFormValues({ ...formValues, status: e.target.value });
    };

    const handleSlideChange = (event: BaseSyntheticEvent, newValue: number | number[]) => {
        setFormValues({ ...formValues, age: newValue as number });
    };

    const handleSubmit = async (event: BaseSyntheticEvent) => {
        event.preventDefault();
        formValues.id ? dispatch(updateTodo(formValues)) : dispatch(saveTodo(formValues));
    };

    const handleClose = () => {
        dispatch(setIsCreateFormOpen(false));
    };

    return (
        <Dialog open={true} onClose={handleClose} data-testid='createToDoFormDialog'>
            <Box className={classes.container}>
                <Typography variant='h6' className={classes.formTitle} data-testid='formTitle'>
                    {formValues.id ? 'Update To-Do Item' : 'Create New To-Do Item'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        id='userName'
                        name='userName'
                        label='User Name'
                        onChange={handleInputChange}
                        value={formValues.userName}
                        required={true}
                        type={'text'}
                        size='small'
                        error={!!(emailError)}
                        helperText={!!(emailError) ? emailError : ''}
                        data-testid='userNameInput'
                    />
                    <FormControl component="fieldset" className={'checkbox-radio-control'}>
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={formValues.gender} onChange={handleInputChange}>
                            <FormControlLabel value="Female" control={<Radio color="primary" />} label="Female" />
                            <FormControlLabel value="Male" control={<Radio color="primary" />} label="Male" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={'checkbox-radio-control'}>
                        <FormLabel component="legend">Hobby</FormLabel>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.hobby.includes('Sports')}
                                    value={'Sports'}
                                    onChange={handleInputChange}
                                    name="hobby"
                                    color="primary"
                                    data-testid='sportsCheckbox'
                                />
                            }
                            label="Sports"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.hobby.includes('Reading')}
                                    value={'Reading'}
                                    onChange={handleInputChange}
                                    name="hobby"
                                    color="primary"
                                />
                            }
                            label="Reading"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formValues.hobby.includes('Music')}
                                    value={'Music'}
                                    onChange={handleInputChange}
                                    name="hobby"
                                    color="primary"
                                />
                            }
                            label="Music"
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Age</FormLabel>
                        <Slider
                            value={formValues.age}
                            name='age'
                            min={18}
                            step={1}
                            max={55}
                            onChange={handleSlideChange}
                            valueLabelDisplay="auto"
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            id="date"
                            name='date'
                            label="Date"
                            type="date"
                            value={formValues.date}
                            onChange={handleInputChange}
                            InputLabelProps={{ shrink: true }}
                            size='small'
                        />
                    </FormControl>
                    <FormControl component="fieldset">
                        <TextField
                            id='taskName'
                            name='taskName'
                            label='Task Name'
                            value={formValues.taskName}
                            onChange={handleInputChange}
                            required={true}
                            type={'text'}
                            size='small'
                            data-testid='taskName'
                        />
                    </FormControl>
                    <FormControl>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            id="status"
                            name='status'
                            value={formValues.status}
                            onChange={handleSelectChange}
                        >
                            <MenuItem value={'Active'}>Active</MenuItem>
                            <MenuItem value={'InActive'}>InActive</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className={classes.btnsWrapper}>
                        <Button variant='contained' color='secondary' type='reset' onClick={handleClose} data-testid='cancelBtn'>Cancel</Button>
                        <Button variant='contained' color='primary' type='submit' disabled={false} data-testid='submitBtn'>
                            {formValues.id ? 'Update To Do' : 'Create To Do'}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Dialog>
    );
};
export default CreateToDoFormDialog;
