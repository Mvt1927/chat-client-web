import Icon from "@mui/material/Icon"
import IconButton from '@mui/material/IconButton';

export default function FunctionButton({size=36,className="",disabled=false, onClick, mdHidden=false}) {
    return (
        <IconButton onClick={onClick} disabled={disabled} sx={{ width: size, height: size }}>
            <Icon style={{display:'flex'}} className="flex items-center justify-center" sx={{ width: size-10, height: size-10 }}>
                <i className={`flex justify-center text-center ${className}`} />
            </Icon>
        </IconButton>
    )
}
