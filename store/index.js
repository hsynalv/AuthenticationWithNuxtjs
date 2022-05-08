import Vuex from "vuex"
import cookie from "js-cookie";
import axios from "axios";

const createStore = () => {
    return new Vuex.Store({
        state : {
            authKey : null
        },
        mutations : {
            setAuthKey(state, authKey){
                state.authKey = authKey;
            },
            clearAuthKey(state){
                cookie.remove("authKey");
                cookie.remove("expiresIn");
                if(process.client) {
                    localStorage.removeItem("authKey")
                    localStorage.removeItem("expiresIn")
                }
                state.authKey = null;
            }
        },
        actions : {
            nuxtServerInit(vuexContext, context){

            },
            initAuth(vuextContext,req){
                let token;
                let expiresIn;

                if(req){
                    //server üzeri
                    if(!req.headers.cookie){
                        return
                    }
                    // Cookie üzerinden almak
                    token = req.headers.cookie.split(";").find(c => c.trim().startsWith("authKey="))
                    if (token) {
                        token = token.split("=")[1]
                        console.log(token)
                    }
                    expiresIn = req.headers.cookie.split(";").find(c => c.trim().startsWith("expiresIn="))
                    if (expiresIn) {
                        expiresIn = expiresIn.split("=")[1]
                        console.log(expiresIn)
                    }

                }else{
                    // Client üzeri
                    token = localStorage.getItem("authKey")
                    expiresIn = localStorage.getItem("expiresIn")
                }
                if(new Date().getTime() > +expiresIn || !token){
                    vuextContext.commit("clearAuthKey")
                }

                vuextContext.commit("setAuthKey",token);
            },
            authUser(vuexContext,authData){
                let authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
                if(authData.isUser){
                    authLink = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
                }

                return axios.post(authLink + process.env.firebaseApiKey,
                    { email : authData.user.email, password : authData.user.password, returnSecureToken : true })
                    .then( response => {

                        let expiresIn = new Date().getTime() + (+response.data.expiresIn * 1000)

                        cookie.set("authKey",response.data.idToken);
                        cookie.set("expiresIn",expiresIn)
                        localStorage.setItem("authKey",response.data.idToken)
                        localStorage.setItem("expiresIn",expiresIn)
                        vuexContext.commit("setAuthKey",response.data.idToken)
                    })
            },
            logOut(vuexContext){
                vuexContext.commit("clearAuthKey")
            }
        },
        getters : {
            isAuthenticated(state){
                return state.authKey != null;
            },
            getAuthKey(state){
              return state.authKey;
            }
        }
    })
}

export default createStore;