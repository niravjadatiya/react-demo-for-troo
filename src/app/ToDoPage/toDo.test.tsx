import { fireEvent, render, RenderResult, screen, within } from '@testing-library/react';
import ToDoPage from './index';
import { Provider } from 'react-redux';
import store from '../../redux/store';

const renderToDoPage = (): RenderResult =>
    render(
        <Provider store={store}>
            <ToDoPage />
        </Provider>
    );

beforeEach(() => {
    renderToDoPage();
});

test('To Do Page Renders', () => {
    // renderToDoPage();
    const toDoWrapper = screen.getByTestId('toDoWrapper');
    expect(toDoWrapper).toBeInTheDocument();
});

describe('To Do Flow', () => {
    test('Dialog Open Close and Checking Validations', async () => {

        // Open Dialog
        const createToDoBtn = screen.getByTestId('createToDoBtn');
        fireEvent.click(createToDoBtn);
        // expect(store.getState('isCreateFormOpen')).toBeTruthy();

        expect(screen.getByTestId('createToDoFormDialog')).toBeInTheDocument();
        expect(screen.getByTestId('formTitle')).toHaveTextContent('Create New To-Do Item');

        // adding values to inputs and checking validations
        const userNameInput: any = screen.getByTestId('userNameInput').querySelector('input[name="userName"]');

        // check if validate message appears with red color
        fireEvent.change(userNameInput, { target: { value: '123456' } });
        const errText = screen.getByText('Only Alphabets allowed!');
        expect(errText).toBeInTheDocument();
        expect(errText).toHaveStyle('color: rgb(244, 67, 54)');

        // check if both condition fails
        fireEvent.change(userNameInput, { target: { value: 'Nirav Adatiya 123456' } });
        expect(screen.getByText('Only Alphabets allowed! Name should not more than 15 characters long!')).toBeInTheDocument();


        expect(screen.getByTestId('submitBtn')).toHaveTextContent('Create To Do');
        // Close Dialog
        fireEvent.click(screen.getByTestId('cancelBtn'));
        expect(screen.queryByTestId('createToDoFormDialog')).not.toBeInTheDocument();
    });

    it('Create new todo', () => {
        // Opening Dialog
        const createToDoBtn = screen.getByTestId('createToDoBtn');
        fireEvent.click(createToDoBtn);

        // Filling Values
        const userNameInput: any = screen.getByTestId('userNameInput').querySelector('input[name="userName"]');
        fireEvent.change(userNameInput, { target: { value: 'Nirav Adatiya' } });

        const genderRadio: any = screen.getByTestId('sportsCheckbox');
        fireEvent.click(genderRadio);

        const taskName: any = screen.getByTestId('taskName').querySelector('input[name="taskName"]');
        fireEvent.change(taskName, { target: { value: 'ToDo Task Name' } });

        const submitBtn = screen.getByTestId('submitBtn');
        fireEvent.click(submitBtn);

    });

    it('Checks Table has newly created todo', () => {
        const toDoTableWrapper = screen.getByTestId('toDoTableWrapper');
        const row: any = toDoTableWrapper.querySelector('table tbody tr');
        const utils = within(row);
        expect(utils.getByText('Nirav Adatiya')).toBeInTheDocument();
        expect(utils.getByText('ToDo Task Name')).toBeInTheDocument();
    });

    it('checks edit todo and checks updated value on table', () => {
        // Opens Dialog
        const rowEditBtn = screen.getByTestId('rowEditBtn');
        fireEvent.click(rowEditBtn);

        // Text should be Update instead of create
        expect(screen.getByTestId('createToDoFormDialog')).toBeInTheDocument();
        expect(screen.getByTestId('formTitle')).toHaveTextContent('Update To-Do Item');
        expect(screen.getByTestId('submitBtn')).toHaveTextContent('Update To Do');

        const userNameInput: any = screen.getByTestId('userNameInput').querySelector('input[name="userName"]');
        fireEvent.change(userNameInput, { target: { value: 'Updated Record' } });

        fireEvent.click(screen.getByTestId('submitBtn'));

        const toDoTableWrapper = screen.getByTestId('toDoTableWrapper');
        const row: any = toDoTableWrapper.querySelector('table tbody tr');
        const utils = within(row);
        expect(utils.getByText('Updated Record')).toBeInTheDocument();
    });


    it('checking delete flow with confirm delete and record removed from table', () => {
        // Clicking delete btn
        const toDoTableWrapper = screen.getByTestId('toDoTableWrapper');
        const row: any = toDoTableWrapper.querySelector('table tbody tr.MuiTableRow-root');
        expect(row).toBeInTheDocument();

        const rowDeleteBtn = screen.getByTestId('rowDeleteBtn');
        fireEvent.click(rowDeleteBtn);

        const confirmationDialog = screen.getByTestId('confirmationDialog');
        expect(confirmationDialog).toBeInTheDocument();

        const confirmationDialogDeleteBtn = screen.getByTestId('confirmationDialogDeleteBtn');
        fireEvent.click(confirmationDialogDeleteBtn);

        expect(confirmationDialog).not.toBeInTheDocument();
        expect(row).not.toBeInTheDocument();

    });
});

