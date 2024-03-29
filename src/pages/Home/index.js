import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonViewWillEnter, IonAlert, IonButtons } from '@ionic/react';
import React, { useState } from 'react';
import { add, trashOutline, pencilSharp, exitOutline } from 'ionicons/icons';
import ApiService from '../../services/api.service';
import { getId, logout } from '../../utils/storage';
import { List, Grid, Typography } from '@material-ui/core';
import useLocalStyles from './style'
import useStyles from '../style'
import CheckUpListItem from './components/CheckUpListItem';

function Home({ history }) {

  const localClasses = useLocalStyles();
  const classes = useStyles()

  const [checkUps, setCheckUps] = useState([])
  const [showErrorAlert, setShowErrorAlert] = useState(false)
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [selectedCheckUp, setSelectedCheckUp] = useState("")

  useIonViewWillEnter(() => {
    getHealthCheckUps()
  });

  const getHealthCheckUps = async () => {
    await ApiService.GetCollaboratorCheackUps(getId())
      .then(res => {
        setCheckUps(res.data.healthCheckUps)
      })
      .catch(err => {
        setShowErrorAlert(true)
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
        setShowErrorAlert(true)
      })
  }

  const navigateToUpdate = () => {

    const foundCheckUp = checkUps.find(e => e._id === selectedCheckUp);
    const checkUpString = JSON.stringify(foundCheckUp)
    history.push(`/add-checkup/${checkUpString}`)

  }

  const exit = () => {
    logout();
    history.push("/login")
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exames Médicos</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={exit}>
              <IonIcon icon={exitOutline} />
            </IonButton>
          </IonButtons>
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
                <IonFabButton color="danger" onClick={() => setShowDeleteAlert(true)}>
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
                Você ainda não possui nenhum exame médico cadastrado, faça o seu primeiro agora! Basta clicar no botão com sinal de mais abaixo.
              </Typography>
            </Grid>
        }
        <IonAlert
          isOpen={showErrorAlert}
          onDidDismiss={() => setShowErrorAlert(false)}
          header="Ocorreu um erro"
          subHeader="Por favor tente novamente mais tarde"
          buttons={[
            {
              text: "OK",
              handler: () =>
                setShowErrorAlert(false)
            }
          ]}
        />
        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Deseja realmente excluir este exame?"
          subHeader={`ID do exame: ${selectedCheckUp}`}
          message="Clique em <strong>SIM</strong> para confirmar a exclusão do exame selecionado ou clique em <strong>NÃO</strong> para cancelar"
          buttons={[
            {
              text: "SIM",
              handler: () =>
                deleteCheckUp()
            },
            {
              text: "NÃO",
              handler: () =>
                setShowDeleteAlert(false)
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
