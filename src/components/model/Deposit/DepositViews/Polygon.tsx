
import { useEffect, useState } from "react";
import DepositsContainer from "../../Container/DepositsContainer";
import QRCode from "qrcode.react";
import { getUserData } from "../../../controller/UserDataController/getUserData";


const Polygon: React.FC = () => {

    const [wallet, setWallet] = useState('');

    useEffect(()=> {
        
        async function fetchData () {

            const response = await getUserData();
            if(response) {
                setWallet(response.wallets.evm);
            }

        }

        fetchData();

    },[]);

    const qrCode =  <QRCode
    
    value={wallet}
    size={250}
    renderAs="svg"
    imageSettings={{

      src: "https://brla.digital/static/media/logo_b.png",
      x: undefined,
      y: undefined,
      height: 24,
      width: 24,
      excavate: true,

    }}

  />

    return (

        <DepositsContainer
        
        qrCode = {qrCode}
        heading = {<div className="flex items-center gap-2"><img src="/polygon.svg" className="w-12" alt="Polygon icon"/> 
        Endereço Polygon </div>}

        subHeading={<p className="text-3xl text-heading-blue">
            Atenção, aceitamos somente <span className="font-bold">BRLA, USDC e USDT!</span> </p>}

        description="Este endereço de carteira está na rede Polygon, e não temos controle ou responsabilidade sobre um endereço igual em outra rede. Tokens enviados para este endereço em outras redes poderão ser perdidos."
        copyItem={wallet}
        
        
        
        />
    )
}

export default Polygon;