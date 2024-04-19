

export async function addressService (cep: string) {


    try {

        const request = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const json = await request.json();
    
        return json;

    } catch(e: any) {

        return null;

    }







}

