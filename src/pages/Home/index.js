import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonViewWillEnter, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { add, trashOutline, pencilSharp } from 'ionicons/icons';
import ApiService from '../../services/api.service';
import { getId } from '../../utils/storage';
import { List, Grid, Typography } from '@material-ui/core';
import useLocalStyles from './style'
import useStyles from '../style'
import CheckUpListItem from './components/CheckUpListItem';

function Home({ history }) {

  const localClasses = useLocalStyles();
  const classes = useStyles()

  const [checkUps, setCheckUps] = useState([])
  const [showAlert, setShowAlert] = useState(false)
  const [selectedCheckUp, setSelectedCheckUp] = useState("")

  useIonViewWillEnter(() => {
    getHealthCheckUps()
  });

  const getHealthCheckUps = async () => {
    await ApiService.GetCollaboratorCheackUps(getId())
      .then(res => {
        setCheckUps(res.data.healthCheckUps.reverse())
      })
      .catch(err => {
        setShowAlert(true)
      })
  }

  const deleteCheckUp = async () => {

    await ApiService.DeleteCheckUp(selectedCheckUp)
      .then(res => {
        const index = checkUps.findIndex(e => e._id === selectedCheckUp)
        checkUps.splice(index, 1)
        setCheckUps([...checkUps])
        setSelectedCheckUp("")
      })
      .catch(err => {
        setShowAlert(true)
      })
  }

  const navigateToUpdate = () => {

    const foundCheckUp = checkUps.find(e => e._id === selectedCheckUp);
    const checkUpString = JSON.stringify(foundCheckUp)
    history.push(`/add-checkup/${checkUpString}`)

  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exames Médicos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          !selectedCheckUp ?
            <IonFab vertical="bottom" horizontal="end" slot="fixed">
              <IonFabButton onClick={() => history.push("/add-checkup")}>
                <IonIcon icon={add} />
              </IonFabButton>
            </IonFab>
            :
            <>
              <IonFab vertical="bottom" horizontal="start" slot="fixed">
                <IonFabButton color="danger" onClick={deleteCheckUp}>
                  <IonIcon icon={trashOutline} />
                </IonFabButton>
              </IonFab>
              <IonFab vertical="bottom" horizontal="end" slot="fixed">
                <IonFabButton color="light" onClick={navigateToUpdate}>
                  <IonIcon icon={pencilSharp} />
                </IonFabButton>
              </IonFab>
            </>
        }
        {
          checkUps && checkUps.length > 0 ?
            <List className={localClasses.list}>
              {checkUps.map((item) =>
                <CheckUpListItem checkUp={item} select={setSelectedCheckUp} />
              )}
            </List>
            :
            <Grid container justify='center'>
              <Typography variant="body1" className={classes.warningText}>
                Você ainda não possui nenhum exame médico cadastrado, faça o seu primeiro agora! Basta clicar no botão abaixo.
              </Typography>
            </Grid>
        }
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Ocorreu um erro"
          subHeader="Por favor tente novamente mais tarde"
          buttons={[
            {
              text: "OK",
              handler: () =>
                setShowAlert(false)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
