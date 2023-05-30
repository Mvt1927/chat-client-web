class mySetting{
    constructor(){
        this.HOST = "https://chatapp-server2.herokuapp.com"
        // this.HOST = "http://localhost:3333"
        // this.HOST = "http://192.168.8.100:3333"
        this.API = this.HOST+"/api";
        this.AUTH = this.HOST+"/auth";
        this.CHAT = this.HOST+"/chat";
        this.getChats = this.CHAT+"/getchats";
        this.USERS = this.AUTH+"/getusers";
        this.loginAPI = this.AUTH+"/signin";
        this.signupAPI = this.AUTH+"/signup";
        this.ACCESS_TOKEN ="access_token"
        this.IS_SOCKET_CONNECTED ="is_socket_connected"
        this.SOCKET="socket"
        this.ROUTE={
            LOGIN:'/login',
            MESSAGE:'/m',
            LOGOUT:'/logout',
            REGISTER:'/register',
            HOME:'',
            MESSAGE_ID:'/m/:id',
        }
    }
}
export default (new mySetting)
