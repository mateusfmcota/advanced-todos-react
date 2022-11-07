import React from 'react';
import {Button, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem} from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TarefaTile= (props) => {
    const {task} = props;
    

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEditar = () => {
        window.location.replace(`editar/${task._id}`);
        setAnchorEl(null);
    };

    const handleExcluir = () => {
        Meteor.call('tasks.remove', task._id);
        setAnchorEl(null);
    };

    return(
        <ListItem disablePadding>
            <ListItemButton>
                <ListItemIcon>
                    <AccessTimeIcon />
                </ListItemIcon>
                <ListItemText primary={task.text} secondary={task.userId} />
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <MoreVertIcon />
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleEditar}>Editar</MenuItem>
                        <MenuItem onClick={handleExcluir}>Excluir</MenuItem>
                    </Menu>
            </ListItemButton>
        </ListItem>);
}