import { Component } from "react";
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"

class UserCardTopContainer extends Component {
    constructor(props) {
        super(props);
        this.className = ""
        this.userInformation = {
            srcAvatar: '/avatar.jpg',
            username: 'Username',
            id: "",
            online: false,
        }
    }
    render() {
        if (this.props.obj != null) {
            this.userInformation.id = this.props.obj.id || this.userInformation.id
            this.userInformation.username = this.props.obj.username || this.userInformation.username
            this.userInformation.srcAvatar = this.props.obj.srcAvatar || this.userInformation.srcAvatar
            this.userInformation.online = this.props.obj.online || this.userInformation.online
            this.className = this.props.obj.className || this.className
        }
        return (
            <Button className={`${this.className} `} color="inherit">
                <Avatar sx={{ width: 36, height: 36 }} className="mx-1 justify-center flex items-center">
                    <img
                        src="/avatar.jpg"
                        alt="avatar"
                    />
                </Avatar>
                <div className="flex flex-col px-2 normal-case text-justify max-w-[30vw] sm:max-w-[40vw] md:max-w-[50vw]">
                    <a className="text-base whitespace-nowrap max-w-full truncate">{this.userInformation.username}</a>
                </div>
            </Button>
        )
    }
}
export default UserCardTopContainer;
