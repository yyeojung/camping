import { useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { AREA0, regionMapping } from "../../commons/data/subArea";
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

interface Option {
  value: string;
  label: string;
}

const createOptions = (areas: string[]): Option[] =>
  areas.map((area) => ({
    value: area,
    label: area,
  }));

export default function DropDown() {
  const [selectedRegion, setSelectedRegion] =
    useState<SingleValue<Option>>(null);
  const [subRegions, setSubRegions] = useState<Option[]>([]);

  const onChangeRegion = (seletedOption: SingleValue<Option>) => {
    setSelectedRegion(seletedOption);
    if (seletedOption) {
      const subAreas =
        regionMapping[seletedOption.value as keyof typeof regionMapping];
      setSubRegions(createOptions(subAreas));
    } else {
      setSubRegions([]);
    }
  };

  // !!!! 시 선택하면 하위 지역 리셋하기

  return (
    <>
      <Select
        options={createOptions(AREA0)}
        onChange={onChangeRegion}
        placeholder="광역시도 선택"
      />
      <Select
        options={subRegions}
        placeholder="하위 지역 선택"
        isDisabled={!selectedRegion}
      />
    </>
  );
}
