
export type TaxIdType = 'CPF' | 'CNPJ'

export type Address = {

  cep: string,
  city: string,
  state: string,
  street: string,
  number: string,
  district: string,
  complement: string
  country: string;

}
export type FormState = {


        fullName: string,
        email: string;
        password: string,
        confirmPassword: string,
        phone: string;
        taxIdType: TaxIdType,
        cpf: string,
        birthDate: string,
    
        address: Address
   
        cnpj: string,
        companyName: string,
        startDate: string,


    

}