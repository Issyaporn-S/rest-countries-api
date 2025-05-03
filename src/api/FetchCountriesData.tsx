type Currency = {
  code: string;
  name: string;
  symbol: string;
};

type Language = {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
};

type Flag = {
  svg: string;
  png: string;
};

type RegionalBloc = {
  acronym: string;
  name: string;
};

export type CountryProps = {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  subregion: string;
  region: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  flags: Flag;
  currencies: Currency[];
  languages: Language[];
  translations: Record<string, string>;
  flag: string;
  regionalBlocs: RegionalBloc[];
  cioc: string;
  independent: boolean;
};

export const fetchCountries = async (): Promise<CountryProps[]> => {
  try{
    const response = await fetch("/data.json");
    if(!response.ok){
      throw new Error("Network response was not OK");
    }
    const data: CountryProps[] = await response.json();
    return data;
  } catch(error) {
    console.error("Error fetching country data: ", error)
    return [];
  }
}
