import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        marginBottom: theme.spacing(8)
    },
    nested: {
        paddingLeft: theme.spacing(4),
    }
}));

export default useStyles;