import { FC } from "preact/compat";

export const Screen: FC = (props) => {

    return (
        <div className="z-99 fixed top-0 left-0 right-0 bottom-0 overflow-x-hidden overflow-y-hidden">
            {props.children}
        </div>
    )
}