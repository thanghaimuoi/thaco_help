import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import Document from '@mui/icons-material/Description';
import Folder from '@mui/icons-material/Folder';

const TreeItemRoot = styled(TreeItem)(({ theme }) => ({
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


function CustomTreeItem(props) {
    const {
        bgColor,
        color,
        label,
        isFolder,
        item,
        ...other
    } = props;

    return (
        <TreeItemRoot
            label={
                <Grid container>
                    <Grid item xs={1} sx={{paddingTop: "0.4rem"}}>
                        {
                            props.isFolder? <Folder /> : <Document />
                        }
                    </Grid>
                    <Grid item xs={11}>
                        <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, padding: "0.6rem 1rem" }}>
                            {props.label}
                        </Typography>
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

CustomTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    label: PropTypes.string.isRequired,
    isFolder: PropTypes.bool.isRequired,
    item: PropTypes.object.isRequired,
};

export default CustomTreeItem;