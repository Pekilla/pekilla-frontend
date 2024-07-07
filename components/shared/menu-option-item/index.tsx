import { MenuItem, Stack, Typography } from "@mui/material";

/**
 * Interface for the options of the menu that the user see when he click the three dots.
 */
export interface MenuOption {
    // Action that will be called after the user click the item.
    action(): void;
    name: string;

    // It should be a MUI icon. Ex : <EditIcon />
    icon: any;
}

interface MenuOptionItemProps extends MenuOption {
    /**
     * Action that will be called after action(). It should be an action that is similar for all items.
    */
    basicAction?: any;
}

export function MenuOptionItem(props: MenuOptionItemProps) {
    return (
        <MenuItem key={props.name} onClick={() => {
            props.action(); 
            props.basicAction?.();
        }}>
            <Stack direction={"row"} spacing={1}>
                {props.icon}
                <Typography variant="inherit">{props.name}</Typography>
            </Stack>
        </MenuItem>
    );
}