import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 20,
        padding: 50
    }
}));

export default useStyles;