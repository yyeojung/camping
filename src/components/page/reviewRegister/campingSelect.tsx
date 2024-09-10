import { responsive } from "@/commons/styles/globalStyles";
import DropDown, { customSelect } from "@/components/dropdown";
import { useCampingData } from "@/hooks/useCampingData";
import { useSearch } from "@/hooks/useSearch";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import Select, { type SingleValue } from "react-select";

const Wrap = styled.div`
  width: calc(100% - 18.4rem);

  @media ${responsive.mobile} {
    width: 100%;
  }
  .row {
    display: flex;
    gap: 1rem;
    justify-content: space-between;

    @media ${responsive.mobile} {
      flex-direction: column;
    }
  }

  .review_select {
    gap: 1rem;
    width: calc(100% - (100% / 3));

    @media ${responsive.mobile} {
      width: 100%;
    }

    > div {
      width: 50%;

      @media ${responsive.mobile} {
        width: 100%;
      }
    }
  }

  .select__control {
    box-shadow: none;
    width: 100%;
    border-width: 0.1rem;
    border-color: #ccc;
    background: #f2f2f2;
    color: #000;

    &:hover {
      border-color: #ccc;
    }
    .select__indicator {
      color: #ccc;
    }

    .select__single-value {
      color: #000;
    }

    .select__placeholder {
      color: #b5b5b5;
    }

    &.select__control--is-disabled {
      border-color: #d9d9d9;
      background: #e3e3e3;
    }
  }
  .camping_name {
    width: calc((100% - 2rem) / 3);

    @media ${responsive.mobile} {
      width: 100%;
    }
  }

  .guide {
    font-size: 1.4rem;
    margin-top: 1rem;
    color: #dc5353;
  }
`;

interface Option {
  value: string;
  label: string;
}

interface IPropsSelectCamping {
  onSelectCamping: (selectedCamping: {
    contentId: string;
    facltNm: string;
  }) => void;
}

export default function CampingSelect({
  onSelectCamping,
}: IPropsSelectCamping) {
  const { region, subRegion, onChangeSearch } = useSearch();
  const [campingDisabled, setCampingDisabled] = useState(true);
  const [selectCampingName, setSelectCampingName] =
    useState<SingleValue<Option>>(null); // 캠핑장 이름
  const [campingData] = useCampingData();

  const campingName = campingData
    ?.filter((item) => {
      if (subRegion === "전체") {
        return item.doNm === region;
      } else {
        // 광역시도, 지역 모두 선택된 경우
        return item.doNm === region && item.sigunguNm === subRegion;
      }
    })
    .map((item) => ({
      contentId: item.contentId,
      facltNm: item.facltNm,
    }));

  // 캠핑장 이름 비활성화 및 리셋
  useEffect(() => {
    region !== "전체" ? setCampingDisabled(false) : setCampingDisabled(true);
    setSelectCampingName(null);
  }, [region, subRegion]);

  // 캠핑장 이름 select option
  const optionCamping = campingName?.map((item) => ({
    value: item.facltNm,
    label: item.facltNm,
  }));

  const onChangeCampingSelect = (selectedOption: SingleValue<Option>) => {
    setSelectCampingName(selectedOption);

    // 선택된 캠핑장 이름 찾아서 이름, contentId 전달
    const selectedCamping = campingName?.find(
      (item) => item.facltNm === selectedOption?.value,
    );
    if (selectedCamping) {
      onSelectCamping(selectedCamping);
    }
  };

  // 셀렉트 스타일
  const customStyle = customSelect();
  return (
    <Wrap>
      <div className="row">
        <DropDown className="review_select" onChangeSearch={onChangeSearch} />
        <Select
          className="camping_name"
          styles={customStyle}
          classNamePrefix="select"
          placeholder="캠핑장 선택"
          onChange={onChangeCampingSelect}
          isDisabled={campingDisabled}
          options={optionCamping}
          value={selectCampingName} // 선택된 캠핑장 값
          noOptionsMessage={() => "캠핑장이 없습니다."} // 캠핑장 없을 때 메세지
          isSearchable={false} // 텍스트 입력 비활성화 readonly
        />
      </div>
      <p className="guide">지역을 선택하면 캠핑장 목록을 확인할 수 있습니다.</p>
    </Wrap>
  );
}
