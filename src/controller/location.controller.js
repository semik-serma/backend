import axios from "axios";

export const detectLocation = async (req, res) => {
  try {
    // Don't send localhost IP — let ipapi auto-detect
    const geo = await axios.get("https://ipapi.co/json/");

    const country = geo.data.country_name;
    const code = geo.data.country_code;

    const flag = `https://countryflagsapi.com/png/${code}`;

    res.status(200).json({ country, code, flag });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Location detection failed" });
  }
};
