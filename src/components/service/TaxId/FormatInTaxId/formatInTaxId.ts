import { formatValueInCnpj } from "../Cnpj/formatValueInCnpj"
import { formatValueInCpf } from "../Cpf/formatValueInCpf"
import { isCpf } from "../Cpf/verifyCpf"



export const formatInTaxId = (taxId: string) => {

    return isCpf(taxId) ? formatValueInCpf(taxId) : formatValueInCnpj(taxId)

}