import * as React from "react";
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import ContactCardContainer from "./contactCardContainer";
import FunctionButton from "../functionButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

export default function ContactsContainer({ currentChatID, navigate, changeChat, contacts, currentUser }) {
    const handleScroll = (e) => {
        e.preventDefault();
        var element = document.getElementById("under_line");
        if (e.currentTarget.scrollTop > 5) {
            element.className = "border-b border-border-color";
        } else {
            element.className = "";
        }
    };
    const changeCurrentChat = (currentChatID, contact) => {
        changeChat(currentChatID, contact)
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const menuOpen = Boolean(anchorEl);
    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    return (
        <div className={`${currentChatID ? ' hidden md:w-my-left md:flex' : ' md:flex'} sm:w-my-left border-r border-border-color flex-col flex-shrink-0 flex-grow-0`}>
            <div className="user-top-left flex flex-col px-4 py-2.5 h-14">
                <div className="user flex flex-row pad justify-between items-center">
                    <IconButton onClick={handleAvatarClick} sx={{ width: 42, height: 42, ml: 0 }} /* className="avatar-left w-3/12 flex" */>
                        <Avatar sx={{ width: 36, height: 36 }} /* className="w-9 h-9 hover:bg-[#00000020] hover:opacity-100 rounded-full cursor-pointer" */>
                            <img
                                // className="w-9 rounded-full hover:mix-blend-overlay hover:bg-black"
                                src="/avatar.jpg"
                                alt="avatar"
                            />
                        </Avatar>
                    </IconButton>

                    <Menu
                        className="account-menu"
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={menuOpen}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                        PaperProps={{
                            elevation: 0,
                            sx: {
                                overflow: 'visible',
                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                mt: 1.5,
                                '& .MuiAvatar-root': {
                                    width: 32,
                                    height: 32,
                                    ml: 0,
                                    mr: 1,
                                },
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    left: 14,
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                },
                            },
                        }}
                        transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                    >
                        <MenuItem>
                            <Avatar>
                                <img src="/avatar.jpg" alt="avatar" />
                            </Avatar>
                            {currentUser?.username}
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon className="flex items-center">
                                <Settings fontSize="small" />
                                <div className="mx-2">Settings</div>
                            </ListItemIcon>
                        </MenuItem>
                        <MenuItem onClick={(e) => { navigate('/logout') }}>
                            <ListItemIcon className="flex items-center">
                                <Logout fontSize="small" />
                                <div className="mx-2">Logout</div>
                            </ListItemIcon>
                        </MenuItem>
                    </Menu>


                    <div className="app-name-mid w-6/12 self-center">
                        <p className="text-center text-base">Chat</p>
                    </div>
                    <div className="fun-btn-right w-3/12 text-center flex flex-row justify-center">
                        <FunctionButton
                            size={36}
                            className="text-black text-lg fa-light fa-video-plus"
                        ></FunctionButton>
                        <FunctionButton
                            size={36}
                            className="text-black text-lg icon bi bi-pencil-square"
                        ></FunctionButton>
                    </div>
                </div>
            </div>
            <div className="search-mid h-14 px-4 pb-3 pt-1.5">
                <div className="search-box flex flex-row bg-f2f2f2 h-full relative rounded-full">
                        <i className="fa-light fa-magnifying-glass text-base ml-3 flex absolute h-[38px] items-center"/>
                    <input
                        className="search-input-right px-1.5 pl-8 pt-2.252 pb-1.752 text-sm font-light w-full rounded-full bg-f2f2f2 placeholder:text-sm placeholder:text-7C676B focus:outline-none"
                        type={"search"}
                        placeholder="Tìm kiếm trên Messenger"
                        aria-label="Tìm kiếm trên Messenger"
                    />

                </div>
            </div>
            <div id="under_line"></div>
            <div className="list-friend-bottom overflow:hidden px-1 h-10/12">
                <div
                    onScroll={e => handleScroll(e)}
                    className="overflow-scroll px-1.5 h-full space-y-1"
                >
                    {contacts&&contacts.map((contact, index) => {
                        return <ContactCardContainer key={contact.id} index={index} selectID={currentChatID} obj={contact} navigate={navigate} changeChat={e=>{changeCurrentChat(contact.id,contact)}} />
                    })}
                </div>
            </div>
        </div>
    )
}


