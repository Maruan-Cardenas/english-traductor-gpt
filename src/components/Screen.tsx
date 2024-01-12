import { useStore } from "@nanostores/preact"
import { screenStore } from "../store/screen"
import { SelectLanguage } from "./SelectLanguage"

export const Screen = () => {
    const $screen = useStore(screenStore)

    return (    
        <span className="bg-white w-[50%] text-black">
            <SelectLanguage />
            {$screen}
        </span>
    )

}