import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon, useIonViewWillEnter, IonAlert } from '@ionic/react';
import React, { useState } from 'react';
import { add } from 'ionicons/icons';
import ApiService from '../../services/api.service';
import { getId } from '../../utils/storage';
import { List, Grid, Typography } from '@material-ui/core';
import useLocalStyles from './style'
import CheckUpListItem from './components/CheckUpListItem';

function Home({ history }) {

  const localClasses = useLocalStyles();

  const [checkUps, setCheckUps] = useState([])
  const [showAlert, setShowAlert] = useState(false)

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

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Exames Médicos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push("/add-checkup")}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        {
          checkUps && checkUps.length > 0 ?
            <List className={localClasses.list}>
              {checkUps.map((item) =>
                <CheckUpListItem checkUp={item} />
              )}
            </List>
            :
            <Grid container justify='center'>
              <Typography variant="body1" className={localClasses.emptyText}>
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
