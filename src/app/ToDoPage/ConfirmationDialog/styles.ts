import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
    container: {
        width: 500,
        height: 320,
        padding: 20,
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    btnsWrapper: {
        display: 'flex',
        justifyContent: 'space-between'
    }
}));
