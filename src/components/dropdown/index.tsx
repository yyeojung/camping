import { useState } from "react";
import Select from "react-select";
import type { SingleValue } from "react-select";
import { AREA0, regionMapping } from "../../commons/data/subArea";
// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// const customSelect = { 스타일 주기
//   control: (provided: any) => ({
//     ...provided,
//     background: "Red",
//   }),
//   option: (provided: any, state: { isSelected: boolean }) => ({
//     ...provided,
//     backgroundColor: state.isSelected ? "#000" : "green",
//   }),
//   indecatorseparateor: (provided: any) => ({
//     ...provided,
//     display: "none",
//   }),
// };

// 옵션 타입 정의
interface Option {
  value: string;
  label: string;
}

// 드롭다운 옵션
const createOptions = (areas: string[]): Option[] =>
  areas.map((area) => ({
    value: area,
    label: area,
  }));

export default function DropDown() {
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
    <>
      <Select
        instanceId="main_select"
        options={createOptions(AREA0)}
        onChange={onChangeRegion}
        placeholder="광역시도 선택"
        // styles={customSelect}
      />
      <Select
        instanceId="sub_select"
        options={subRegions}
        value={subRegionReset}
        onChange={onChangeSubRegion}
        placeholder="하위 지역 선택"
        isDisabled={!selectedRegion}
      />
    </>
  );
}
