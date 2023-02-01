import { Avatar, Button, Checkbox, FormControlLabel, Grid, Link, Paper, TextField, Typography } from '@mui/material';
import React, { Component } from 'react';
import Service from '../../services/service'

const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
const avatarStyle={backgroundColor:'#1bbd7e'}
const btnstyle={margin:'8px 0'}


class LoginPage extends Component {
    state = { user: '', pass: '' } 

    login = async(ev) => {
        Service.login(this.state).then(rs => {
            if (!rs.success) {
                return;
            } else {
                this.props.loginSuccess(rs);
            }
        })
    }

    update = (ev) => {
        let state = {};
        state[ev.target.name] = ev.target.value;
        this.setState(state);
    }

    render() { 
        return (
            <Grid>
            <Paper elevation={30} style={paperStyle}>
                <Grid align='center'>
                     <Avatar style={avatarStyle}></Avatar>
                    <h2>Đăng nhập</h2>
                </Grid>
                <TextField onChange={this.update} name="user" value={this.state.user} size='small' label='Username' placeholder='Enter username' variant="outlined" fullWidth required/>
                <TextField onChange={this.update} name="pass" value={this.state.pass} sx={{marginTop: "1rem"}} size='small' label='Password' placeholder='Enter password' type='password' variant="outlined" fullWidth required/>
                <FormControlLabel
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Nhớ mật khẩu"
                 />
                <Button type='button' onClick={this.login} color='primary' variant="contained" style={btnstyle} fullWidth>Đăng nhập</Button>
            </Paper>
        </Grid>);
    }
}
 
export default LoginPage;