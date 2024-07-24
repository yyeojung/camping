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
  onChangeSearch?: (region: string, subRegion: string | null) => void;
}

const customSelect = (isMain: boolean): StylesConfig<Option, false> => ({
  control: (base, state) => ({
    ...base,
    width: isMain ? "26rem" : "20rem",
    height: "4rem",
    borderRadius: "1rem",
    background: state.isDisabled ? "#f6f6f6" : "rgba(255, 255, 255, 0.3)",
    borderWidth: ".2rem",
    borderStyle: "solid",
    borderColor: state.isDisabled ? "#d9d9d9" : isMain ? "#fff" : "#000",
    boxShadow: ".3rem .3rem .4rem 0 rgba(0, 0, 0, 0.1)",
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

export default function DropDown({ isMain, onChangeSearch }: IPropsSelect) {
  // 광역시
  const [selectedRegion, setSelectedRegion] =
    useState<SingleValue<Option>>(null);
  // 하위지역
  const [subRegions, setSubRegions] = useState<Option[]>([]);
  // 광역시 선택시 하위지역 리셋
  const [subRegionReset, setSubRegionReset] =
    useState<SingleValue<Option>>(null);
  // 하위지역 disabled
  const [subDisabled, setSubDisabled] = useState(true);

  // 광역시도 onChange
  const onChangeRegion = (selectedOption: SingleValue<Option>) => {
    setSelectedRegion(selectedOption);
    setSubRegionReset(null); // 광역시가 선택되면 서브는 리셋
    if (selectedOption) {
      onChangeSearch?.(selectedOption.value, null); // 지역 검색 값 저장

      if (selectedOption.value === "전체") {
        // 전체일 떄는 서브드롭박스를 disabled
        setSubDisabled(true);
      } else {
        // 전체가 아닐 때 서브 드롭박스에 광역시에 맞는 지역으로 매핑
        const subAreas =
          regionMapping[selectedOption.value as keyof typeof regionMapping];
        setSubRegions(createOptions(subAreas));
        setSubDisabled(false);
      }
    } else {
      setSubRegions([]);
    }
  };

  // 하위지역 onChange
  const onChangeSubRegion = (selectedOption: SingleValue<Option>) => {
    setSubRegionReset(selectedOption);
    onChangeSearch?.(
      // 지역 검색 값 저장
      selectedRegion?.value ?? "",
      selectedOption?.value ?? null,
    );
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
