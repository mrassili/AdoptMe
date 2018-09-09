import React from "react";

const SearchContext = React.createContext({
  location: "Los Angoles, CA",
  animal: "",
  breed: "",
  breeds: [],
  handleAnimalChange() {},
  handleBreedChange() {},
  handleLocationChange() {},
  getBreeds() {}
});

export const SearchProvider = SearchContext.Provider;
export const SearchConsumer = SearchContext.Consumer;
