import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize("G-29GE7Q3GLZ");
};

export const logPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.search,
  });
};