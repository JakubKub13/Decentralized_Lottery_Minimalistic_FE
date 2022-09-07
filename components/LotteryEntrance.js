import { useWeb3Contract } from "react-moralis"

export default function LotteryEntrance() {

    const {runContractFunction: enterLottery} = useWeb3Contract({
        abi: //,
        contractAddress: //,
        functionName: //,
        params: {},
        magValue: //
    })

    return ( 
        <div> Hi from Entrance </div>
    )
}