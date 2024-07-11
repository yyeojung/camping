import { useState } from "react";
import Select from "react-select";
import type { SingleValue, StylesConfig } from "react-select";
import { AREA0, regionMapping } from "../../commons/data/subArea";
import styled from "@emotion/styled";
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// 옵션 타입 정의
interface Option {
  value: string;
  label: string;
}

// 옵션 타입 정의
interface IPropsSelect {
  isMain: boolean;
}

const customSelect = (isMain: boolean): StylesConfig<Option, false> => ({
  control: (provided) => ({
    ...provided,
    minWidth: isMain ? "26rem" : "20rem",
    background: "rgba(255, 255, 255, 0.3)",
    border: isMain ? ".2rem solid #fff" : "#000",
    boxShadow: "none",
    "&:hover": {
      border: isMain ? ".2rem solid #fff" : "#000",
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "#333",
  }),
});

// 드롭다운 옵션
const createOptions = (areas: string[]): Option[] =>
  areas.map((area) => ({
    value: area,
    label: area,
  }));

const RegionSelect = styled.div<IPropsSelect>`
  display: flex;
  gap: ${(props) => (props.isMain ? "32px" : "10px")};
`;

export default function DropDown({ isMain }: IPropsSelect) {
  // 광역시
  const [selectedRegion, setSelectedRegion] =
    useState<SingleValue<Option>>(null);
  // 행정구역
  const [subRegions, setSubRegions] = useState<Option[]>([]);
  // 광역시 선택시 행정구역 리셋
  const [subRegionReset, setSubRegionReset] =
    useState<SingleValue<Option>>(null);

  // 광역시도 onChange
  const onChangeRegion = (selectedOption: SingleValue<Option>) => {
    setSelectedRegion(selectedOption);
    setSubRegionReset(null);
    if (selectedOption) {
      const subAreas =
        regionMapping[selectedOption.value as keyof typeof regionMapping];
      setSubRegions(createOptions(subAreas));
    } else {
      setSubRegions([]);
    }
  };

  // 행정구역 onChange
  const onChangeSubRegion = (selectedOption: SingleValue<Option>) => {
    setSubRegionReset(selectedOption);
  };

  const customStyle = customSelect(isMain);
  return (
    <RegionSelect isMain={isMain}>
      <Select
        instanceId="main_select"
        options={createOptions(AREA0)}
        onChange={onChangeRegion}
        placeholder="광역시도 선택"
        styles={customStyle}
      />
      <Select
        instanceId="sub_select"
        options={subRegions}
        value={subRegionReset}
        onChange={onChangeSubRegion}
        placeholder="하위 지역 선택"
        isDisabled={!selectedRegion}
        styles={customStyle}
      />
    </RegionSelect>
  );
}
