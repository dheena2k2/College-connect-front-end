import Avatar from '@mui/material/Avatar';
import GroupIcon from '@mui/icons-material/Group';


export function GroupPic({childern, src, alt, ...rest}) {
    if(src !== '') {
        return (
            <Avatar
            src={src}
            alt={alt}
            {...rest} />
        );
    }
    else {
        return (
            <Avatar
            {...rest} >
                <GroupIcon
                sx={{
                    width: '80%',
                    height: '80%'
                }} />
            </Avatar>
        );
    }
}