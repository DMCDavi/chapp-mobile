import { IonIcon } from '@ionic/react';
import { ListItem, ListItemText, Collapse, List, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import useStyles from '../style'

function CheckUpListItem({ checkUp }) {

    const localClasses = useStyles()
    const [open, setOpen] = useState(false)

    return (
        <>
            <ListItem button onClick={() => setOpen(!open)}>
                <ListItemText primary={`ID: ${checkUp._id}`} secondary={new Date(checkUp.createdAt).toLocaleString()} />
                {open ? <IonIcon icon={chevronUpOutline} /> : <IonIcon icon={chevronDownOutline} />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <div className={localClasses.nested}>
                    {
                        checkUp.height ?
                            <Typography variant="body1" >
                                {"Altura: " + checkUp.height + " cm"}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.weight ?
                            <Typography variant="body1" >
                                {"Peso: " + checkUp.weight + " kg"}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.pulse ?
                            <Typography variant="body1" >
                                {"Pulso: " + checkUp.pulse + " bpm"}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.SBP ?
                            <Typography variant="body1" >
                                {"PAS: " + checkUp.SBP + " mmHg"}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.DBP ?
                            <Typography variant="body1" >
                                {"PAD: " + checkUp.DBP + " mmHg"}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.BMI ?
                            <Typography variant="body1" >
                                {"IMC: " + checkUp.BMI}
                            </Typography>
                            : null
                    }
                    {
                        checkUp.CAH ?
                            <Typography variant="body1" >
                                {"Clas. de Hipertensão: " + checkUp.CAH}
                            </Typography>
                            : null
                    }
                </div>
            </Collapse>
        </>
    )
}

export default CheckUpListItem;