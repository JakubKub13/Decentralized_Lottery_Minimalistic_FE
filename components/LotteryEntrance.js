import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants/index"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"

export default function LotteryEntrance() {
    const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis()
    const chainId = parseInt(chainIdHex)
    //console.log(`ChainId is ${chainId}`)
    const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null
    // State Hook
    const [entranceFee, setEntranceFee] = useState("0")
    const [numPlayers, setNumPlayers] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")

    const dispatch = useNotification()

    const {runContractFunction: enterLottery} = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the chainId
        functionName: "enterLottery",
        params: {},
        msgValue: entranceFee,
    })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the chainId
        functionName: "getEntranceFee",
        params: {},
    })

    const {runContractFunction: getNumberOfPlayers} = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the chainId
        functionName: "getNumberOfPlayers",
        params: {},
    })

    const {runContractFunction: getRecentWinner} = useWeb3Contract({
        abi: abi,
        contractAddress: lotteryAddress, // specify the chainId
        functionName: "getRecentWinner",
        params: {},
    })

    async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const recentWinnerFromCall = await getRecentWinner()

        setEntranceFee(entranceFeeFromCall)
        setNumPlayers(numPlayersFromCall)
        setRecentWinner(recentWinnerFromCall)
    }

    useEffect(() => {
        if(isWeb3Enabled) {
            // Try to read the Lottery entrance fee
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function(tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }

    const handleNewNotification = function() {
        dispatch({
            type: "info",
            message: "Transaction Complete !",
            title: "Tx Notification", 
            position: "topR",
            icon: "bell"
        })
    }

    return ( 
        <div> 
            Hi from Lottery Entrance
            { lotteryAddress ? (
            <div>
                <button onClick={async function() {await enterLottery({
                    onSuccess: handleSuccess,
                    onError: (error) => console.log(error),
                    })}}> Enter Lottery </button>
                Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH
                Number of Players: {numPlayers}
                Recent Winner: {recentWinner}
            </div>) : (<div> No Lottery address detected</div>)
            }
        </div>
    )
}