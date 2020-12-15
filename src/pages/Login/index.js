import { IonContent, IonPage, IonImg, IonAlert } from '@ionic/react'
import { TextField, Button, FormControl, Grid, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react'
import useStyles from './style'
import ApiService from '../../services/api.service'
import { login } from '../../utils/storage';

function Login({ history }) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false)
  const [showAlert1, setShowAlert1] = useState(false)
  const [showAlert2, setShowAlert2] = useState(false)
  const [alertSubtitle, setAlertSubtitle] = useState("")
  const [alertTitle, setAlertTitle] = useState("")
  const [alertMsg, setAlertMsg] = useState("")
  const [code, setCode] = useState("")
  const [codeError, setCodeError] = useState(false)
  const [codeHelper, setCodeHelper] = useState("")
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)
  const [passwordHelper, setPasswordHelper] = useState("")

  const handleLogin = async () => {

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
          login(res.data.access_token, code)
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

  const createAccount = async () => {

    setShowAlert1(false)

    await ApiService.Register()
      .then(res => {
        setAlertTitle("Conta criada com sucesso!")
        setAlertSubtitle("Salve essas informações com segurança")
        setAlertMsg(`Código: <strong>${res.data._id}</strong>
                      <br/>
                      Senha: <strong>${res.data.password}</strong>`)
        setCode(res.data._id)
        setPassword(res.data.password)
      })
      .catch(err => {
        setAlertTitle("Ocorreu um erro")
        setAlertSubtitle("Por favor tente novamente mais tarde")
        setAlertMsg("")
      })

    setShowAlert2(true)

  }

  const handleCode = (txt) => {
    setCodeError(false)
    setCodeHelper("")
    setCode(txt)
  }

  const handlePassword = (txt) => {
    setPasswordError(false)
    setPasswordHelper("")
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
            value={code}
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
            value={password}
            onChange={(e) => handlePassword(e.target.value)}
          />
          {
            loading ?
              <Grid container justify='center'>
                <CircularProgress className={classes.button} />
              </Grid>
              :
              <Button variant="contained" color="primary" size="large" className={classes.button} onClick={handleLogin}>
                Entrar
          </Button>
          }
        </FormControl>
        <Grid container justify='center'>
          <Button variant="text" color="primary" size="small" onClick={() => setShowAlert1(true)}>
            Não tenho conta
          </Button>
        </Grid>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => setShowAlert1(false)}
          header={"Deseja criar uma conta?"}
          message={"Clique em <strong>SIM</strong> para gerar aleatoriamente sua conta ou clique em <strong>NÃO</strong> para cancelar"}
          buttons={[
            {
              text: "SIM",
              handler: () =>
                createAccount()
            },
            {
              text: "NÃO",
              handler: () =>
                setShowAlert1(false)
            }
          ]}
        />
        <IonAlert
          isOpen={showAlert2}
          onDidDismiss={() => setShowAlert2(false)}
          header={alertTitle}
          subHeader={alertSubtitle}
          message={alertMsg}
          buttons={[
            {
              text: "OK",
              handler: () =>
                setShowAlert2(false)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
}

export default Login