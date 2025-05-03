import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CountryProps, fetchCountries } from "../api/FetchCountriesData";
import { Box, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";

type Props = {
  darkMode: boolean;
};

function CountryPage(props: Props) {
  const { darkMode } = props;
  const navigate = useNavigate();
  const { countryName } = useParams<{ countryName: string }>();
  const [country, setCountry] = useState<CountryProps | null>(null);
  const [allCountries, setAllCountries] = useState<CountryProps[]>([]);

  useEffect(() => {
    if (!countryName) return;

    fetch("/data.json")
      .then((response) => response.json())
      .then((data: CountryProps[]) => {
        const country = data.find(
          (c) => c.alpha3Code.toLowerCase() === countryName
        );
        setCountry(country || null);
      })
      .catch((error) => console.error("Error fetching data: ", error));
  });

  useEffect(() => {
    fetchCountries().then((data) => setAllCountries(data));
  }, []);

  return (
    <div
      className={`country-page ${
        darkMode === false ? "light-country-page" : "dark-country-page"
      }`}
    >
      <div className="w-full max-w-[1440px] px-[2rem] md:px-[3rem] py-[3rem] md:py-[4rem]">
        <Button
          className="back-btn space-x-3 shadow-md/20"
          onClick={() => navigate("/")}
          sx={{
            padding: "0.5rem 2rem",
            backgroundColor: darkMode === false ? "white" : "#2B3743",
            color: darkMode === false ? "hsl(200, 15%, 8%)" : "white",
          }}
        >
          <ArrowBack sx={{ fontSize: 20 }} />
          <p className="opacity-70">Back</p>
        </Button>
        {country ? (
          <Box
            component={"div"}
            sx={{
              width: "100%",
              height: "fit-content",
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
              },
              columnGap: "3rem",
              rowGap: { xs: "3rem" },
              marginTop: "5rem",
            }}
            className="country-detail"
          >
            <div className="w-full h-auto flex justify-center">
              <img
                src={country.flag}
                alt={`${country.name}-flag`}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{country.name}</h2>
              <Box
                component={"div"}
                className="mt-[2rem]"
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "repeat(1, 1fr)",
                    sm: "repeat(2, 1fr)",
                  },
                  rowGap: "2rem",
                  columnGap: "0.5rem",
                }}
              >
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Native Name: </span>
                    <span className="opacity-70">{country.nativeName}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Population: </span>
                    <span className="opacity-70">{country.population}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Region: </span>
                    <span className="opacity-70">{country.region}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Sub Region: </span>
                    <span className="opacity-70">{country.subregion}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Capital: </span>
                    <span className="opacity-70">{country.capital}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div>
                    <span className="font-semibold">Top Level Domain: </span>
                    <span className="opacity-70">{country.topLevelDomain}</span>
                  </div>
                  <div>
                    <span className="font-semibold">Currencies: </span>
                    <span className="opacity-70">
                      {country.currencies
                        .map((currency) => currency.name)
                        .join(", ")}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold">Languages: </span>
                    <span className="opacity-70">
                      {country.languages
                        .map((language) => language.name)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </Box>
              <div className="boder-countries flex flex-wrap gap-2 mt-[4rem] items-center">
                <span className="text-lg font-semibold mr-[0.5rem]">
                  Border Countries:
                </span>
                <span className="btn-group flex flex-wrap gap-2">
                  {country.borders && country.borders.length > 0 ? (
                    country.borders.map((border, index) => {
                      const borderCountry = allCountries.find(
                        (c) => c.alpha3Code === border
                      );
                      return (
                        <Button
                          key={index}
                          className="shadow-md/20"
                          onClick={() => navigate(`/${border.toLowerCase()}`)}
                          sx={{
                            padding: "0.5rem 2rem",
                            backgroundColor:
                              darkMode === false ? "white" : "#2B3743",
                            color:
                              darkMode === false
                                ? "hsl(200, 15%, 8%)"
                                : "white",
                          }}
                        >
                          {borderCountry ? borderCountry.name : border}
                        </Button>
                      );
                    })
                  ) : (
                    <p className="opacity-70">No bordering countries</p>
                  )}
                </span>
              </div>
            </div>
          </Box>
        ) : (
          <p>Loading country data...</p>
        )}
      </div>
    </div>
  );
}

export default CountryPage;
