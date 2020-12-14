import { IonHeader, IonToolbar, IonPage, IonTitle, IonContent } from '@ionic/react'
import { FormControl, TextField, Button, InputAdornment } from '@material-ui/core'
import React from 'react'
import useStyles from '../style'

function AddHealthCheckUp() {

    const classes = useStyles()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Novo Exame
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <FormControl fullWidth className={classes.formControl}>
                    <TextField
                        id="height"
                        type="number"
                        label="Altura"
                        className={classes.input}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">cm</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="weight"
                        type="number"
                        label="Peso"
                        className={classes.input}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="pulse"
                        type="number"
                        label="Pulso"
                        className={classes.input}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">bpm</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="SBP"
                        type="number"
                        label="Pressão arterial sistólica"
                        className={classes.input}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                        }}
                    />
                    <TextField
                        id="DBP"
                        type="number"
                        label="Pressão arterial diastólica"
                        className={classes.input}
                        variant="outlined"
                        InputProps={{
                            endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                        }}
                    />
                    <Button variant="contained" color="primary" size="large" className={classes.button}>
                        Salvar
                    </Button>
                </FormControl>
            </IonContent>
        </IonPage>
    )
}

export default AddHealthCheckUp;