declare module 'react-select-country-list' {
  interface CountryData {
    label: string;
    value: string;
  }

  interface CountryList {
    getData(): CountryData[];
    getLabel(value: string): string;
    getValue(label: string): string;
    getLabels(): string[];
    getValues(): string[];
    getLabelList(): { [key: string]: string };
    getValueList(): { [key: string]: string };
    setLabel(value: string, label: string): void;
    native(): boolean;
    nativeLabel(value: string): string;
  }

  function countryList(): CountryList;
  export default countryList;
}
