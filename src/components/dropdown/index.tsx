import { useState } from "react";
import Select from "react-select";
import type { SingleValue, StylesConfig } from "react-select";
import { AREA0, regionMapping } from "../../commons/data/subArea";
import styled from "@emotion/styled";
import { responsive } from "@/commons/styles/globalStyles";
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
  control: (base, state) => ({
    ...base,
    width: isMain ? "26rem" : "20rem",
    height: "4rem",
    borderRadius: "1rem",
    background: state.isDisabled ? "#f6f6f6" : "rgba(255, 255, 255, 0.3)",
    boxShadow: "none",
    borderWidth: ".2rem",
    borderStyle: "solid",
    borderColor: state.isDisabled ? "#d9d9d9" : isMain ? "#fff" : "#000",
    color: isMain ? "#fff" : "#000",
    "&:hover": {
      borderColor: isMain ? "#fff" : "#000",
    },
    "@media (max-width: 767px)": {
      width: "100%",
    },
  }),
  placeholder: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#d9d9d9" : isMain ? "#fff" : "#000",
  }),
  singleValue: (base) => ({
    ...base,
    color: isMain ? "#fff" : "#000",
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isDisabled ? "#d9d9d9" : isMain ? "#fff" : "#000",
    transition: "all .2s",
    transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : "rotate(0deg)",
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "1rem",
    padding: ".6rem 0 .8rem .6rem",
  }),
  option: (base, state) => ({
    ...base,
    minHeight: "3.6rem",
    width: isMain ? "24.4rem" : "18.4rem",
    background: state.isSelected
      ? "#67794A"
      : state.isFocused
        ? "rgb(103, 121, 74, 0.8)"
        : base.background,
    color: state.isSelected || state.isFocused ? "#fff" : base.color,
    borderRadius: "1rem",
    "&:hover": {
      background: "rgb(103, 121, 74, 0.8)",
    },
    "&:active": {
      background: "#67794A",
    },
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
  gap: ${(props) => (props.isMain ? "3.2rem" : "1.0rem")};

  @media ${responsive.mobile} {
    flex-direction: column;
    gap: ${(props) => (props.isMain ? "1rem" : "0.125rem")};
  }
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
  // 행정구역 disabled
  const [subDisabled, setSubDisabled] = useState(true);

  // 광역시도 onChange
  const onChangeRegion = (selectedOption: SingleValue<Option>) => {
    setSelectedRegion(selectedOption);
    setSubRegionReset(null);
    if (selectedOption) {
      if (selectedOption.value === "전체") {
        setSubDisabled(true);
      } else {
        const subAreas =
          regionMapping[selectedOption.value as keyof typeof regionMapping];
        setSubRegions(createOptions(subAreas));
        setSubDisabled(false);
      }
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
        isSearchable={false}
        options={createOptions(AREA0)}
        value={selectedRegion}
        onChange={onChangeRegion}
        placeholder="광역시도 선택"
        styles={customStyle}
      />
      <Select
        instanceId="sub_select"
        isSearchable={false}
        options={subRegions}
        value={subRegionReset}
        onChange={onChangeSubRegion}
        placeholder="하위 지역 선택"
        isDisabled={subDisabled}
        styles={customStyle}
      />
    </RegionSelect>
  );
}
