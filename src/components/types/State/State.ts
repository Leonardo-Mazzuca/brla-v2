
export type State = {


        fullName: string,
        email: string;
        password: string,
        confirmPassword: string,
        phone: string;
        taxIdType: string,
        cpf: string,
        birthDate: string,
    
        address: {
          cep: string,
          city: string,
          state: string,
          street: string,
          number: string,
          district: string,
          complement: string
        },
   
        //cnpj: string,


    

}