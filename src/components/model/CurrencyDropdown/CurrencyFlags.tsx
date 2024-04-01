

type CurrencyConfig = {
    code: string;
    name: string;
    flag: string;
}

type Currency  ={
    currencies: CurrencyConfig[];
    handleChange: (currency: string) => void;
}

const CurrencyFlags = ({currencies,handleChange}: Currency) => {

    return (

        <div
        className="origin-top-right z-50 absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="dropdown-button"
        tabIndex={-1}
      >
        <div className="py-1" role="none">

          {currencies.map(({ code, name, flag }) => (
            <button
              key={code}
              onClick={() => handleChange(code)}
              className="text-gray-700 block w-full px-4 py-2 text-sm text-left hover:bg-gray-100"
              role="menuitem"
              tabIndex={-1}
            >
              <img
                className="w-5 h-5 mr-2 rounded-full"
                src={flag}
                alt={`${name} flag`}
              />
              {`${code} - ${name}`}
            </button>
            
          ))}
          
        </div>
      </div>

    );

}

export default CurrencyFlags;