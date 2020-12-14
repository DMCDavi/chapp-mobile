import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import React from 'react';
import { add } from 'ionicons/icons';

function Home({history}) {
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
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
      </IonContent>
    </IonPage>
  );
};

export default Home;
