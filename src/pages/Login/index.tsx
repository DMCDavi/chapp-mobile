import { IonContent, IonInput, IonPage, IonButton, IonImg } from '@ionic/react'
import { TextField, Button, FormControl, Grid, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './style'
import ApiService from '../../services/api.service'
import { RouteComponentProps } from 'react-router';

interface ContainerProps extends RouteComponentProps { }

const Login: React.FC<ContainerProps> = ({ history }) => {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(false)
  const [codeHelper, setCodeHelper] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState("")

  const login = async () => {

    setCodeError(false)
    setPasswordError(false)

    if (!code) {
      setCodeHelper("Por favor informe o código")
      setCodeError(true)
    }

    if (!password) {
      setPasswordHelper("Por favor insira sua senha")
      setPasswordError(true)
    }

    if (code && password) {
      setLoading(true);

      const credential = {
        id: code,
        password: password
      }

      await ApiService.Login(credential)
        .then(res => {
          setLoading(false)
          history.push("/home")
        })
        .catch(err => {
          setLoading(false)
          if (err && err.response && err.response.data && err.response.data.statusCode === 404) {
            setCodeHelper("Código incorreto")
            setCodeError(true)
          } else if (err && err.response && err.response.data && err.response.data.statusCode === 401) {
            setPasswordHelper("Senha incorreta")
            setPasswordError(true)
          } else {
            setCodeHelper("Código ou senha incorretos")
            setPasswordHelper("Código ou senha incorretos")
            setCodeError(true)
            setPasswordError(true)
          }
        })
    }
  }

  const handleCode = (txt: string) => {
    setCodeError(false)
    setCodeHelper("")
    setCode(txt)
  }

  const handlePassword = (txt: string) => {
    setPasswordError(false)
    setPassword(txt)
  }

  return (
    <IonPage>
      <IonContent >
        <IonImg src="https://www.logopik.com/wp-content/uploads/edd/2018/07/Medicine-Logo-Vector-Design.png" className={classes.logo} />
        <FormControl className={classes.formControl} fullWidth={true}>
          <TextField
            error={codeError}
            helperText={codeError ? codeHelper : ""}
            id="code"
            label="Código"
            variant="outlined"
            className={classes.input}
            onChange={(e) => handleCode(e.target.value)}
          />
          <TextField
            error={passwordError}
            helperText={passwordError ? passwordHelper : ""}
            id="password"
            label="Senha"
            variant="outlined"
            type="password"
            className={classes.input}
            onChange={(e) => handlePassword(e.target.value)}
          />
          {
            loading ?
              <Grid container justify='center'>
                <CircularProgress className={classes.button} />
              </Grid>
              :
              <Button variant="contained" color="primary" size="large" className={classes.button} onClick={login}>
                Entrar
          </Button>
          }
        </FormControl>
        <Grid container justify='center'>
          <Button variant="text" color="primary" size="small">
            Não tenho conta
          </Button>
        </Grid>
      </IonContent>
    </IonPage>
  );
}

export default Login