import { IonButtons, IonBackButton, IonHeader, IonToolbar, IonPage, IonTitle, IonContent, useIonViewWillEnter } from '@ionic/react'
import { FormControl, TextField, Button, InputAdornment, FormHelperText, Grid, CircularProgress, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import ApiService from '../../services/api.service'
import useStyles from '../style'
import { getId } from '../../utils/storage'

function AddHealthCheckUp({ match }) {

    const classes = useStyles()

    const [height, setHeight] = useState("")
    const [weight, setWeight] = useState("")
    const [pulse, setPulse] = useState("")
    const [SBP, setSBP] = useState("")
    const [DBP, setDBP] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState("")
    const [checkUpId, setCheckUpId] = useState("")
    const [update, setUpdate] = useState(false)
    const [unauthorized, setUnauthorized] = useState(false)

    useIonViewWillEnter(() => {
        if (match.params.data) {
            const checkUp = JSON.parse(match.params.data)
            if (checkUp.collaborator !== getId()) {
                setUnauthorized(true)
                return
            }
            if (checkUp._id)
                setCheckUpId(checkUp._id)
            if (checkUp.height)
                setHeight(checkUp.height)
            if (checkUp.weight)
                setWeight(checkUp.weight)
            if (checkUp.pulse)
                setPulse(checkUp.pulse)
            if (checkUp.SBP)
                setSBP(checkUp.SBP)
            if (checkUp.DBP)
                setDBP(checkUp.DBP)
            setUpdate(true)
        }
        else {
            setUnauthorized(false)
            setUpdate(false)
            setCheckUpId("")
        }

    });

    const createCheckUp = async () => {

        setError(false)
        setSuccess(false)

        if (!height && !weight && !pulse && !SBP && !DBP) {
            setErrorMsg("Você precisa preencher no mínimo um campo")
            setError(true)
            return
        }

        setLoading(true)

        const data = {
            weight,
            height,
            pulse,
            SBP,
            DBP,
            collaborator: getId()
        }

        await ApiService.CreateCheckUp(data)
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.message === "Some of your provided data is incorrect")
                    setErrorMsg("Alguns dos dados fornecidos estão incorretos")
                else
                    setErrorMsg("Ocorreu um erro, por favor tente mais tarde")
                setError(true)
            })

        setLoading(false)

    }

    const updateCheckUp = async () => {

        setError(false)
        setSuccess(false)

        if (!height && !weight && !pulse && !SBP && !DBP) {
            setErrorMsg("Você precisa preencher no mínimo um campo")
            setError(true)
            return
        }

        setLoading(true)

        const data = {
            weight,
            height,
            pulse,
            SBP,
            DBP,
            collaborator: getId()
        }

        await ApiService.UpdateCheckUp(checkUpId, data)
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                if (err && err.response && err.response.data && err.response.data.message === "Some of your provided data is incorrect")
                    setErrorMsg("Alguns dos dados fornecidos estão incorretos")
                else
                    setErrorMsg("Ocorreu um erro, por favor tente mais tarde")
                setError(true)
            })

        setLoading(false)

    }

    const handleHeight = (txt) => {
        setError(false)
        setSuccess(false)
        setHeight(txt)
    }

    const handleWeight = (txt) => {
        setError(false)
        setSuccess(false)
        setWeight(txt)
    }

    const handlePulse = (txt) => {
        setError(false)
        setSuccess(false)
        setPulse(txt)
    }

    const handleSBP = (txt) => {
        setError(false)
        setSuccess(false)
        setSBP(txt)
    }

    const handleDBP = (txt) => {
        setError(false)
        setSuccess(false)
        setDBP(txt)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>
                        Novo Exame
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {
                    unauthorized ?
                        <Grid container justify='center'>
                            <Typography variant="body1" className={classes.warningText}>
                                Espertinho ne?! Você não pode alterar o exame de outra pessoa!!!
                            </Typography>
                        </Grid>
                        :
                        <FormControl fullWidth className={classes.formControl} error={error}>
                            <TextField
                                id="height"
                                type="number"
                                label="Altura"
                                className={classes.input}
                                variant="outlined"
                                value={height}
                                onChange={(e) => handleHeight(e.target.value)}
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
                                value={weight}
                                onChange={(e) => handleWeight(e.target.value)}
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
                                value={pulse}
                                onChange={(e) => handlePulse(e.target.value)}
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
                                value={SBP}
                                onChange={(e) => handleSBP(e.target.value)}
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
                                value={DBP}
                                onChange={(e) => handleDBP(e.target.value)}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">mmHg</InputAdornment>,
                                }}
                            />
                            {
                                loading ?
                                    <Grid container justify='center'>
                                        <CircularProgress className={classes.button} />
                                    </Grid>
                                    :
                                    <Button variant="contained" color="primary" size="large" className={classes.button} onClick={update ? updateCheckUp : createCheckUp}>
                                        Salvar
                                    </Button>
                            }
                            {
                                error ?
                                    <Grid container justify='center'>
                                        <FormHelperText id="my-helper-text">{errorMsg}</FormHelperText>
                                    </Grid>
                                    :
                                    null
                            }
                            {
                                success ?
                                    <Grid container justify='center'>
                                        <FormHelperText id="my-helper-text">Seu exame foi salvo com sucesso!</FormHelperText>
                                    </Grid>
                                    :
                                    null
                            }
                        </FormControl>
                }
            </IonContent>
        </IonPage>
    )
}

export default AddHealthCheckUp;