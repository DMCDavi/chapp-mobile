import { IonContent, IonInput, IonPage, IonButton, IonImg } from '@ionic/react'
import { TextField, Button, FormControl, Grid } from '@material-ui/core';
import React from 'react'
import useStyles from './style'

interface ContainerProps { }

const Login: React.FC<ContainerProps> = () => {
  const classes = useStyles();
  return (
    <IonPage>
      <IonContent >
        <IonImg src="https://www.logopik.com/wp-content/uploads/edd/2018/07/Medicine-Logo-Vector-Design.png" className={classes.logo} />
        <FormControl className={classes.formControl} fullWidth={true}>
          <TextField id="code" label="Digite seu código" variant="outlined" className={classes.input} />
          <TextField id="password" label="Digite sua senha" variant="outlined" type="password" className={classes.input} />
          <Button variant="contained" color="primary" size="large" className={classes.button}>
            Entrar
          </Button>
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