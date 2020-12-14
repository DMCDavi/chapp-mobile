import { IonHeader, IonToolbar, IonPage, IonTitle } from '@ionic/react'
import React from 'react'

function AddHealthCheckUp(){
    return(
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Novo Exame
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
        </IonPage>
    )
}

export default AddHealthCheckUp;