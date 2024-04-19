import { isCpf } from "../../TaxId/Cpf/verifyCpf"
import { formatValueInCnpj } from "../formatValueInCnpj"
import { formatValueInCpf } from "../formatValueInCpf"




export const formatInTaxId = (taxId: string) => {

    return isCpf(taxId) ? formatValueInCpf(taxId) : formatValueInCnpj(taxId)

}