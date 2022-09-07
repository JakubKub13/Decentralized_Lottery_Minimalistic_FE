import {useMoralis} from "react-moralis"
import {useEffect} from "react"

export default function Manual_Header() {
    const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } = useMoralis()

// function takes 2 params , function as 1st parameter and second optionally dependency [] 
// It keeps checking values in dependency array and if anything there changes it 's gonna call function and rerender the FE
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])


    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`)
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
                console.log("Null account found")
            }
        })
    }, [])

    return(<div>
            {account ? (
                <div>
                    Connected to {account.slice(0,6)}...{account.slice(account.length - 4)}
                </div>)
                 : (<button onClick={async () => {
                        await enableWeb3()
                        if (typeof window !== "undefined") {
                            window.localStorage.setItem("connected", "injected")
                        }
                    }}>Connect</button>)}
            </div>)
}