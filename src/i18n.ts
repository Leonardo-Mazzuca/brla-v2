import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend)
  .use(LanguageDetector) // Use language detector
  .use(initReactI18next)
  .init({
    fallbackLng: "ptbr", // Fallback language
    interpolation: {
      escapeValue: false,
    },
    detection: { // Options for language detector
      order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage']
    },
    resources: {
      ptbr: {
        translation: {
          sou_pj: "Sou pessoa jurídica",
          email_placeholder: "Digite seu email",
          phone_placeholder: "Celular (11 11111-1111)",
          legal_rep_name: "Nome completo do representante legal",
          legal_rep_cpf: "CPF do representante legal",
          legal_rep_birth_date: "Data de nascimento do representante legal",
          company_name: "Nome da empresa",
          company_cnpj: "CNPJ",
          company_start_date: "Data de abertura da empresa",
          person_juridical: "Sou pessoa jurídica",
          non_resident: "Sou não residente do Brasil",
          terms_service_privacy: "termos de serviço e privacidade",
          agree_terms: "Concordo com os",
          have_account: "Já possui uma conta?",
          login_here: "Entre aqui"

        },
      },
      en: {
        translation: {
            sou_pj: "Company",
            email_placeholder: "Enter your email",
            phone_placeholder: "Phone (11 11111-1111)",
            legal_rep_name: "Full name of legal representative",
            legal_rep_cpf: "Legal representative's CPF",
            legal_rep_birth_date: "Legal representative's birth date",
            company_name: "Company name",
            company_cnpj: "CNPJ",
            company_start_date: "Company start date",
            person_juridical: "I am a legal entity",
            non_resident: "I am not a resident of Brazil",
            terms_service_privacy: "terms of service & privacy",
            agree_terms: "I agree with",
            have_account: "Already have an account?",
            login_here: "Login here"
       
        },
      },
    },
  });

export default i18n;