import { makeStyles } from '@material-ui/core';

export default makeStyles(() => ({
    container: {
        width: 537,
        height: 'auto',
        flexDirection: 'column',
        padding: 20,
    },
    formTitle: {
        paddingBottom: 10,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        '& > .MuiFormControl-root': {
            marginBottom: 20
        },
        '& .checkbox-radio-control': {
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            '& .MuiFormGroup-root': {
                display: 'flex',
                flex: 1,
                flexDirection: 'row',
            }
        }
    },
    btnsWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
    },
}));
