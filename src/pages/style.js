import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
    input: {
        marginBottom: 20
    },
    button: {
        marginBottom: 20
    },
    formControl: {
        paddingRight: 20,
        paddingLeft: 20,
        marginTop: 20
    },
    warningText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 50
    }
}));

export default useStyles;