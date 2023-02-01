import { Component } from "react";
import Service from "../services/service";
import LoginPage from "./login/login";
import Main from "./main";


class HomePage extends Component {
  state = { 
    isLoginIn: false,
    user: null
  } 

  componentDidMount() {
    Service.getCurrentUser().then((user) => {
      this.setState({isLoginIn: true, user});
    }).catch(ex => {
      this.setState({isLoginIn: false});
    });
  }

  loginSuccess = (user) => {
    this.setState({isLoginIn: true, user});
  }

  render() { 
    return (
      !this.state.isLoginIn ? 
      <LoginPage loginSuccess={this.loginSuccess} />
      :
      <Main user={this.state.user}></Main>
    );
  }
}
 
export default HomePage;