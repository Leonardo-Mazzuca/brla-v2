
import { useEffect, useState } from "react";
import DepositsContainer from "../../Container/DepositsContainer";
import QRCode from "qrcode.react";
import { brCodeController } from "../../../controller/BrCodeController/brCodeController";


const Pix: React.FC = () => {

    const [brCode, setBrcode] = useState('');

    useEffect(()=> {
        
        async function fetchData () {

            const response = await brCodeController();
            if(response) {
                setBrcode(response);
            }

        }

        fetchData();

    },[]);

    const qrCode =  <QRCode
    
    value={brCode}
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
        heading = {"Escaneie  o QR code ou utilize a chave pix"}
        subHeading="Em alguns segundos o seu saldo estará disponível."
        description="Confira nossa política de termos e serviços aqui Fique atento também à nossa política de Compliance, AML e CFT"
        copyItem={brCode}
        
        
        />

    );
}

export default Pix;