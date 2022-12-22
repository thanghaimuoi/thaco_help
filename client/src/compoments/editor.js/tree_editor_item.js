import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/CreateNewFolder';
import NoteAdd from '@mui/icons-material/NoteAdd'
import IconButton from '@mui/material/IconButton';
import Delete from '@mui/icons-material/Delete';
import { Grid } from '@mui/material';
import Document from '@mui/icons-material/Description';
import Folder from '@mui/icons-material/Folder';

const TreeItemEditorRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(1),
        fontWeight: theme.typography.fontWeightMedium,
        '&.Mui-expanded': {
            fontWeight: theme.typography.fontWeightRegular,
        },
        '&:hover': {
            backgroundColor: theme.palette.action.hover,
        },
        '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: 'var(--tree-view-color)',
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: 'inherit',
            color: 'inherit',
        },
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 0,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2),
        },
    },
}));


function TreeItemEditor(props) {
    const {
        bgColor,
        color,
        label,
        onAddClick,
        onEditClick,
        onDeleteClick,
        item,
        hasCheckBox,
        onItemSelected,
        onChangeExpand,
        checked,
        ...other
    } = props;

    return (
        <TreeItemEditorRoot
            label={
                <Grid container>
                    <Grid item xs={1} sx={{paddingTop: "0.4rem"}}>
                        {
                            props.isFolder? <Folder /> : <Document />
                        }
                    </Grid>
                    <Grid item xs={props.isFolder ? 5 : 8}>
                        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, padding: "0.6rem 1rem" }}>
                            {props.name}
                        </Typography>
                    </Grid>
                    {
                        props.isFolder? 
                            (
                            <>
                            <Grid item xs={1.5}>
                                <IconButton onClick={(ev) => props.onAddFileClick(ev, props.item)}>
                                    <NoteAdd />
                                </IconButton>
                            </Grid>
                            <Grid item xs={1.5}>
                                <IconButton onClick={(ev) => props.onAddFolderClick(ev, props.item)}>
                                    <AddCircleIcon />
                                </IconButton>
                            </Grid>
                            </>
                            ) : ""
                    }
                    <Grid item xs={1.5}>
                        <IconButton onClick={(ev) => props.onEditClick(ev, props.item)}>
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={1.5}>
                        <IconButton onClick={(ev) => props.onDeleteClick(ev, props.item)}>
                            <Delete />
                        </IconButton>
                    </Grid>
                </Grid>
            }
            style={{
                '--tree-view-color': color,
                '--tree-view-bg-color': bgColor,
                width: "95%"
            }}
            {...other}
        />
    );
}

TreeItemEditor.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    onAddFileClick: PropTypes.func,
    onAddFolderClick: PropTypes.func,
    onEditClick: PropTypes.func,
    onDeleteClick: PropTypes.func,
    onItemSelected: PropTypes.func,
    isFolder: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
};

export default TreeItemEditor;