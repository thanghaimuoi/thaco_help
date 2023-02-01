import { Button, Grid } from '@mui/material';
import React, { Component } from 'react';
import TreeEditor from './tree_editor';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Service from '../../services/service';
import Adapter from '../../services/Adapter';

class MainEditor extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        content: "",
        id: null,
    }

    onItemSelected = (ev, id) => {
        this.setState({id});
        Service.getFileContent(id).then((content) => {
            this.setState({content});
        });
    }

    saveData = () => {
        if (this.state.id) {
            Service.update({_id: this.state.id, document: this.state.content}).then(() => {
                alert("Đã lưu nội dung");
            });
        }
    }

    render() {
        const height = "50px"
        return (<>
            <Grid item xs={12} sx={{height}}>
                <img src="/logo-6-3.png" height={"30px"} style={{padding: "10px"}}></img>
            </Grid>
            <Grid container sx={{height: `calc(100vh - ${height})`}}>
                <Grid item xs={3} sx={{flex: 1}}>
                    <TreeEditor
                        onItemSelected={this.onItemSelected}>
                    </TreeEditor>
                </Grid>
                <Grid item xs={9} sx={{flex: 1, padding: "10px"}}>
                    <CKEditor
                        config={{ckfinder:{uploadUrl: "/upload"}}}
                        sx={{height: "100%"}}
                        editor={ ClassicEditor }
                        data={this.state.content}
                        onChange={ ( event, editor ) => {
                            const content = editor.getData();
                            this.setState({content});
                        }}
                    />
                    <Button variant='contained' sx={{float: "right"}} onClick={this.saveData}>Lưu</Button>
                </Grid>
            </Grid>
        </>);
    }
}
 
export default MainEditor;