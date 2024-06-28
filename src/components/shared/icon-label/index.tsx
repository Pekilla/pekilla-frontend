/**
 * FROM Opensell with Modification.
 */

import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const MARGIN_RIGHT = "3px";

export function IconLabel(props: { iconProp: IconProp, title: string }) {
    return (
        <>
            <label style={{ display: "flex", alignItems: "center" }}>
                <FontAwesomeIcon style={{ marginRight: MARGIN_RIGHT }} icon={props.iconProp} />
                <span style={{ fontSize: "16px", marginRight: MARGIN_RIGHT }}>{props.title}</span>
            </label>
        </>
    )
}