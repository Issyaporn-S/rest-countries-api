import { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { KeyboardArrowDownOutlined } from "@mui/icons-material";
import { CountryProps, fetchCountries } from "../api/FetchCountriesData";
import { useNavigate } from "react-router-dom";

type Props = {
  darkMode: boolean;
};

function Homepage(props: Props) {
  const { darkMode } = props;

  const navigate = useNavigate();

  const [countryData, setCountryData] = useState<CountryProps[]>([]);

  const [searchInput, setSearchInput] = useState("");
  const [selected, setSelected] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchCountries().then((data) => setCountryData(data));
  }, []);

  const handleSelect = (event: SelectChangeEvent) => {
    setSelected(event.target.value as string);
  };

  const filteredContries = countryData.filter((country) => {
    const filterName = country.name
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const filterRegion = selected === "" || country.region === selected;
    return filterName && filterRegion;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginationCountries = filteredContries.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handlePagerChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div
      className={`homepage ${
        darkMode === false ? "home-light" : "home-dark"
      } px-[2rem] md:px-[5rem] py-[2rem] md:py-[3rem]`}
    >
      <div className="w-full max-w-[1440px]">
        <Box
          className="search-sec"
          sx={{
            display: { xs: "flex", md: "grid" },
            gridTemplateColumns: "repeat(4, 1fr)",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <Box className="search-field shadow-md" sx={{ gridColumn: "span 2" }}>
            <Search />
            <input
              type="text"
              className="search-input"
              name="search-country"
              placeholder="Search for a country..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </Box>
          <Box
            className="filter"
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "subgrid" },
              gridColumn: { md: "span 2" },
            }}
          >
            <Select
              className="filter-dropdown shadow-md"
              value={selected}
              displayEmpty
              renderValue={(selected) => {
                if (selected === "") {
                  return <span>Filter by Region</span>;
                } else return selected;
              }}
              onChange={handleSelect}
              sx={{
                "& fieldset": { border: "none" },
                "& .MuiSelect-icon": {
                  color: darkMode === false ? "hsl(0, 0%, 50%)" : "white",
                  right: 12,
                },
                gridColumnStart: { xs: 1, md: 2 },
              }}
              IconComponent={KeyboardArrowDownOutlined}
              MenuProps={{
                PaperProps: {
                  sx: {
                    backgroundColor: darkMode === false ? "white" : " #2B3743",
                    color: darkMode === false ? "hsl(0, 0%, 50%)" : "white",
                  },
                },
              }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value={"Africa"}>Africa</MenuItem>
              <MenuItem value={"Americas"}>Americas</MenuItem>
              <MenuItem value={"Asia"}>Asia</MenuItem>
              <MenuItem value={"Europe"}>Europe</MenuItem>
              <MenuItem value={"Oceania"}>Oceania</MenuItem>
            </Select>
          </Box>
        </Box>

        <Box
          component={"div"}
          className="country-card"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(1 ,1fr)",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            rowGap: "3rem",
            columnGap: "3rem",
          }}
        >
          {paginationCountries.map((country: CountryProps, index: number) => (
            <Button
              key={index}
              onClick={() =>
                navigate(`/${country.alpha3Code.toLowerCase()}`)
              }
              sx={{ width: "100%", height: "100%" }}
            >
              <Card
                className="country-card"
                sx={{ width: "100%", height: "100%" }}
              >
                <CardMedia
                  sx={{ height: "10rem" }}
                  image={country.flag}
                  title={`${country.name}-image`}
                />
                <CardContent
                  className="content"
                  sx={{ width: "100%", height: "100%" }}
                >
                  <h3 className="name text-xl font-bold mb-[1rem]">
                    {country.name}
                  </h3>
                  <div className="detail text-sm mb-[1rem] space-y-1">
                    <div>
                      <span className="font-bold">Population: </span>
                      <span className="opacity-70">{country.population}</span>
                    </div>
                    <div>
                      <span className="font-bold">Region: </span>
                      <span className="opacity-70">{country.region}</span>
                    </div>
                    <div>
                      <span className="font-bold">Capital: </span>
                      <span className="opacity-70">{country.capital}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Button>
          ))}
        </Box>
        <div className="pagination">
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(filteredContries.length / itemsPerPage)}
              page={currentPage}
              onChange={handlePagerChange}
              variant="outlined"
              shape="rounded"
              sx={{
                "& .MuiPaginationItem-root": {
                  color:
                    darkMode === false
                      ? "hsl(0, 0%, 50%)"
                      : "rgba(255, 255, 255, 0.5)",
                  "&.Mui-selected": {
                    backgroundColor: darkMode === false ? "white" : "#2B3743",
                    color: darkMode === false ? "hsl(200, 15%, 8%)" : "white",
                  },
                },
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
