import React from "react";

import { Form, TextInput, Button, } from "carbon-components-react";

import GoogleLogin from "react-google-login";
import { HeaderPanel } from "carbon-components-react/es/components/UIShell";
import { withRouter } from "react-router-dom";
import { AuthService } from "../../services/session-service";
import nodeJoi from "joi";
import { login as bLogin, register } from "../../services/api-requests";

const usernLoginSchema = nodeJoi.object().options({ abortEarly: false }).keys({
  usern: nodeJoi.string().trim().min(6).required(),
  pwd: nodeJoi.string().min(8).max(25).required(),
});
const emailLoginSchema = nodeJoi.object().options({ abortEarly: false }).keys({
  email: nodeJoi.string().email({ tlds: { allow: false } }).required(),
  pwd: nodeJoi.string().min(8).max(25).required(),
});



const signupSchema = nodeJoi.object().options({ abortEarly: false }).keys({
  usern: nodeJoi.string().trim().min(6).required(),
  email: nodeJoi.string().email({ tlds: { allow: false } }).required(),
  pwd: nodeJoi.string().min(8).max(25).required(),
  confirmPws: nodeJoi.string().min(8).max(25).required().equal(nodeJoi.ref('pwd')).required()
    .label('Confirm password')
    .messages({ 'any.only': '{{#label}} does not match' })
});


class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      usern: "",
      email: "",
      pwd: "",
      confirmPws: "",
      formN: 0,
      invalid: {
        usern: false,
        email: false,
        pwd: false,
        confirmPws: false,
      }
    }
  }

  inLogin = () => {
    this.props.history.goBack()
  }

  alreadyLogged = () => {

    this.props.history.push('/')
  }



  validateLogin = (callback) => {
    let { formN, invalid, confirmPws, ...info } = { ...this.state }
    let v;

    if (!info.usern.includes('@')) {
      delete info.email
      v = (usernLoginSchema.validate(info).error) ? usernLoginSchema.validate(info).error.details : [];
      if (v.length === 0) {
        this.setState({
          invalid: {
            usern: false,
            email: false,
            pwd: false,
            confirmPws: false,
          }
        })
        if(callback()) this.alreadyLogged()
        else 
        this.setState({
          invalid: {
            confirmPws: true,
          }
        })
        return
      }
      let invalidities = v.map(detail => {
        return detail.context.key
      })
      this.setState({
        invalid: {
          usern: invalidities.includes("usern"),
          pwd: invalidities.includes("pwd") || info.pwd.length === 0,
        }
      })
    } else {
      delete info.usern
      console.log('v', info)
      v = (emailLoginSchema.validate(info).error) ? emailLoginSchema.validate(info).error.details : [];
      console.log('v', v)
      if (v.length === 0) {

        this.setState({
          invalid: {
            usern: false,
            email: false,
            pwd: false,
            confirmPws: false,
          }
        })

        callback();
        return 
      }
      let invalidities = v.map(detail => {
        return detail.context.key
      })
      this.setState({
        invalid: {
          usern: invalidities.includes("email"),
          pwd: invalidities.includes("pwd") || info.pwd.length === 0,
        }
      })
    }



  }

  validateSignup = (callback) => {
    let { formN, invalid, ...info } = { ...this.state }

    let v = (signupSchema.validate(info).error) ? signupSchema.validate(info).error.details : [];
    if (v.length === 0) {
      console.log("valido")

      this.setState({
        invalid: {
          usern: false,
          email: false,
          pwd: false,
          confirmPws: false,
        }
      })

      callback();
      return
    }
    let invalidities = v.map(detail => {
      return detail.context.key
    })
    this.setState({
      invalid: {
        usern: invalidities.includes("usern"),
        email: invalidities.includes("email"),
        pwd: invalidities.includes("pwd"),
        confirmPws: invalidities.includes("confirmPws") || info.confirmPws.length === 0,
      }
    })

  }


  render() {
    if (AuthService.isLoggedIn())
      this.alreadyLogged();

    return (
      <div>
        <HeaderPanel expanded style={{ position: "abolute", top: "0px", width: "40%", minWidth: "40em", backgroundColor: "rgba(255, 255, 255, 0.692)" }}>
          <div className="bx--grid bx--grid--full-width v-center-login ">
            <div className="bx--row  bx--row-padding ">
              <div className="bx--col-lg-16 slides">
                <div className="slider-wrapper" style={{ transform: `translateX(-${this.state.formN * (100 / 2)}%)` }} >

                  <div className="slide">
                    <Form className="userForm">
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput
                          id="email-login-input"
                          helperText="Use su email o nombre de usuario para ingresar"
                          invalidText="Nombre de usuario invalido"
                          labelText="Email o Nombre de usuario"
                          placeholder="User234"
                          value={this.state.usern}
                          invalid={this.state.invalid.usern}
                          onChange={(ev) => this.setState({ usern: ev.target.value, email: ev.target.value })}
                        />
                      </div>
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput.PasswordInput
                          id="pwd-login-input"
                          helperText=""
                          invalidText="Constraseña incorrecta"
                          labelText="Ingrese su contraseña"
                          placeholder="contraseña"
                          value={this.state.pwd}
                          invalid={this.state.invalid.pwd}
                          onChange={(ev) => this.setState({ pwd: ev.target.value })}
                        />
                      </div>

                      <Button
                        kind="secondary"
                        tabIndex={0}
                        onClick={() => {
                          this.setState({
                            usern: "",
                            email: "",
                            pwd: "",
                            confirmPws: "",
                            formN: 1,
                            invalid: {
                              usern: false,
                              email: false,
                              pwd: false,
                              confirmPws: false,
                            }
                          })
                        }}
                      >Signup</Button>
                      <Button
                        className="bx--btn--login"
                        kind="primary"
                        tabIndex={1}
                        onClick={() => {
                          this.validateLogin(()=> bLogin(AuthService.getUserData))
                        }}
                      >Login</Button>
                    </Form>
                  </div>

                  <div className="slide">
                    <Form className=" userForm signupForm">
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput
                          id="usern-singup-input"
                          helperText="Elija un nombre de usuario"
                          invalidText="Nombre de usuario invalido, debe contener min 6 caracteres"
                          labelText="Nombre de usuario"
                          placeholder="User234"
                          value={this.state.usern}
                          invalid={this.state.invalid.usern}
                          onChange={(ev) => this.setState({ usern: ev.target.value })}
                        />
                      </div>
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput
                          id="email-singup-input"
                          helperText="Ingrese el correo con el que se quiere registrar"
                          invalidText="Correo invalido"
                          labelText="Correo"
                          placeholder="ejemplo@email.com"
                          value={this.state.email}
                          invalid={this.state.invalid.email}
                          onChange={(ev) => this.setState({ email: ev.target.value })}
                        />
                      </div>
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput.PasswordInput
                          id="pwd-singup-input"
                          helperText="La contraseña dedbe ser de 8-25 caracteres"
                          invalidText="Contraseña invalida, la contraseña dedbe tener entre de 8 y 25 caracteres"
                          labelText="Contraseña"
                          placeholder="contraseña"
                          value={this.state.pwd}
                          invalid={this.state.invalid.pwd}
                          onChange={(ev) => this.setState({ pwd: ev.target.value })}
                        />
                      </div>
                      <div style={{ marginBottom: '2rem' }}>
                        <TextInput.PasswordInput
                          id="cpwd-singup-input"
                          helperText=""
                          invalidText="Las contraseñas no coinciden"
                          labelText="Confirme contraseña"
                          placeholder="constraseña"
                          value={this.state.confirmPws}
                          invalid={this.state.invalid.confirmPws}
                          onChange={(ev) => this.setState({ confirmPws: ev.target.value })}
                        />
                      </div>

                      <Button
                        kind="secondary"
                        tabIndex={0}

                        onClick={() => {
                          this.setState({
                            usern: "",
                            email: "",
                            pwd: "",
                            confirmPws: "",
                            formN: 0,
                            invalid: {
                              usern: false,
                              email: false,
                              pwd: false,
                              confirmPws: false,
                            }
                          })
                        }}
                      >Login</Button>
                      <Button
                        className="bx--btn--signup"
                        kind="primary"
                        tabIndex={1}
                        onClick={() => {
                          let {usern,email,pwd} = {...this.state}
                          this.validateSignup(()=>register({usern,email,pwd}))

                        }}
                      >Signup</Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </HeaderPanel>
        <div className="bx--grid bx--grid--full-width center-google-login" >
          <div className="bx--row" >
            <div className="bx--col-lg-7" >

              <GoogleLogin
                className="google-login"
                clientId="118173056472-mdp22meace5j234t85p79epiv7e61q16.apps.googleusercontent.com"
                buttonText="Login or Signup Google"
                onSuccess={(response) => {
                  console.log("login", response)
                  console.log("login", response.tokenObj.idToken )
                  AuthService.saveUserData({ userId: response.googleId, token: response.tokenObj.id_token , usern: response.profileObj.name })
                  register({ email:response.profileObj.email , pToken: response.tokenObj.id_token , usern: response.profileObj.name })
                  this.inLogin()

                }}
                onFailure={(response) => {
                  console.log(response)


                }}

              />

            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Login);
