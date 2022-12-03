import React from 'react';
import { DialogActions } from '@mui/material';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { FaBold } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners/ClipLoader';

function LoadingDialog() {

    return (
        <div style={{width: "20%"}}>
                <Dialog open={true}>
                    <DialogTitle style={{color: "#191970", fontSize: 18, textDecoration: "bold"}}>
                        Loading
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText style={{color: "#000", fontSize: 12}}>
                              <ClipLoader color={'#000'} size={50} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    </DialogActions>
                </Dialog>
            </div>


    );

}

export default LoadingDialog