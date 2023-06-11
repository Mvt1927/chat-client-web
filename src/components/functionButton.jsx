import Icon from "@mui/material/Icon"
import IconButton from '@mui/material/IconButton';

export default function FunctionButton({bgColor = "#F5F5F5", size = 36, className = "", disabled = false, onClick, Icon }) {
    return (
        <IconButton
            style={{
                backgroundColor:bgColor,
                margin: "2px 2px"
            }}
            onClick={onClick} disabled={disabled} sx={{ width: size, height: size }}>
            <Icon className={className} />
        </IconButton>
    )
}
