import { Component } from "react";
import Button from "@mui/material/Button"
import Avatar from '@mui/material/Avatar'
import moment from 'moment'
import dateShort from "./moment-shortformat";

class ContactCardContainer extends Component {
    constructor(props) {
        super(props);
        this.currentUserId = ""
        this.selectID = ""
        this.userInformation = {
            srcAvatar: '/avatar.jpg',
            username: 'Username',
            chat: {
                msg: "",
                time: "",
                from: null,
                to: null,
            },
            id: "",
            timeAway: "",
        }
        this.navigate = () => { }
        this.changeChat = () => { }
        
    }
    componentDidMount() {
        const navigate = this.props.navigate
        const changeChat = this.props.changeChat
        this.navigate = navigate || this.navigate
        this.changeChat = changeChat || this.changeChat
    }

    handleOnClick = (e, id) => {
        e.preventDefault();
        this.changeChat(id, this.props.obj)
        this.navigate("/m/" + id)
    }
    render() {
        if (this.props.obj != null) {
            this.userInformation.id = this.props.obj.id || this.userInformation.id
            this.selectID = this.props.selectID || this.selectID
            this.userInformation.username = this.props.obj.username || this.userInformation.username
            this.userInformation.srcAvatar = this.props.obj.srcAvatar || this.userInformation.srcAvatar
            this.userInformation.chat.msg = this.props.obj.chat[0]?.msg || this.userInformation.chat.msg
            this.userInformation.chat.time = this.props.obj.chat[0]?.createdAt || this.userInformation.chat.time
            this.userInformation.chat.from = this.props.obj.chat[0]?.from || this.userInformation.chat.from
            this.userInformation.chat.to = this.props.obj.chat[0]?.to || this.userInformation.chat.to
        }
        if (this.userInformation.chat.time !== "" && moment(this.userInformation.chat.time).isValid() ) {
            this.userInformation.timeAway = dateShort(this.userInformation.chat.time)
        }
        return (
            <div color="inherit" id={this.userInformation.id} className={(this.selectID == this.userInformation.id ? " select " : "") + "" + this.props.className} onClick={(event) => this.handleOnClick(event, this.userInformation.id)}>
                <Button className="w-full" color="inherit">
                    <div className="item-friend w-full h-full flex flex-row text-justify items-center normal-case ">
                        <div className="w-fit pr-2.5">
                        <Avatar sx={{ width: 42, height: 42 }} >
                            <img
                                src={this.userInformation.srcAvatar}
                                alt=""
                            />
                        </Avatar>
                        </div>
                        <div className="friend-info w-4/5 flex flex-col">
                            <span className="name-friend text text-base truncate">{this.userInformation.username}</span>
                            <div className="lastest-message flex flex-row">
                                <span className="short-text-latest-message max-w-fit w-4/6 text-xs font-light whitespace-nowrap truncate font-base">
                                    {this.userInformation.chat.from ? this.currentUserId == this.userInformation.chat.from ? ("You: " + this.userInformation.chat.msg) : this.userInformation.chat.msg : ""}
                                </span>
                                <p className="text-xs">&nbsp;</p>
                                <p className="text-xs"> · </p>
                                <p className="text-xs">&nbsp;</p>
                                <span className="time-receive-latest-message w-1/6 text-xs font-light whitespace-nowrap">
                                    {this.userInformation.timeAway}
                                </span>
                            </div>
                        </div>
                    </div>
                </Button>
            </div>
        );
    }
}
export default ContactCardContainer;
