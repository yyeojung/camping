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
  gap?: string;
}

const customSelect: StylesConfig<Option, false> = {
  control: (provided) => ({
    ...provided,
    minWidth: "26rem",
  }),
  //   option: (provided, state: { isSelected: boolean }) => ({
  //     ...provided,
  //     backgroundColor: state.isSelected ? "#000" : "green",
  //   }),
};

// 드롭다운 옵션
const createOptions = (areas: string[]): Option[] =>
  areas.map((area) => ({
    value: area,
    label: area,
  }));

const RegionSelect = styled.div<IPropsSelect>`
  display: flex;
  gap: ${(props) => props.gap ?? "32px"};
`;

export default function DropDown({ gap }: IPropsSelect) {
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

  return (
    <RegionSelect gap={gap}>
      <Select
        instanceId="main_select"
        options={createOptions(AREA0)}
        onChange={onChangeRegion}
        placeholder="광역시도 선택"
        styles={customSelect}
      />
      <Select
        instanceId="sub_select"
        options={subRegions}
        value={subRegionReset}
        onChange={onChangeSubRegion}
        placeholder="하위 지역 선택"
        isDisabled={!selectedRegion}
        styles={customSelect}
      />
    </RegionSelect>
  );
}
