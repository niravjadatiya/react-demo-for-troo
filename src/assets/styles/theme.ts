// TODO: this is material known issue while moving to version 5 it should solve https://stackoverflow.com/a/64135466/3545036
import { unstable_createMuiStrictModeTheme as createTheme } from '@material-ui/core';

// Creating a theme instance.
export const theme = createTheme({
    // palette: {
    //     // type: 'dark',
    //     primary: {
    //         // main: 'gold'
    //     },
    //     secondary: {
    //         // main: 'blue'
    //     }
    // },
    typography: {
        // fontFamily: 'Open Sans',
        // fontSize: 14,
    },
    shape: {
    },
    spacing: 8,
    overrides: {

    },
    props: {

    }
});
