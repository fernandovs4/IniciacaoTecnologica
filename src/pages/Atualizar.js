import { FreeBreakfast } from "@mui/icons-material"
import { useEffect } from "react"

const Atualizar = () => {
    useEffect(() => {
        fetch("localhost:5000/atualizar", {
            method: 'GET',

        })
        .then(resp => resp.json)
        .then(resp => {
            console.log(resp)
        })
}
)

}

export default Atualizar