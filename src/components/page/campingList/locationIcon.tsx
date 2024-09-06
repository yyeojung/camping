import styled from "@emotion/styled";

interface IPropsType {
  type: string;
}

const Icon = styled.i<IPropsType>`
  display: inline-block;
  width: 3.2rem;
  height: 3.2rem;
  background-size: 100%;
  background-repeat: no-repeat;
  ${(props) => {
    switch (props.type) {
      case "산":
        return `background-image: url(/image/icon/icon_mountain.png)`;
      case "숲":
        return `background-image: url(/image/icon/icon_forest.png)`;
      case "강":
      case "계곡":
        return `background-image: url(/image/icon/icon_wave.png)`;
      case "해변":
        return `background-image: url(/image/icon/icon_beach.png)`;
      default:
        return `
            width: 1rem;
            height: .1rem;
            background: #67794A;
        `;
    }
  }};
`;

export function LocationIcon({ type }: IPropsType) {
  return (
    <Icon type={type}>
      <span className="sr_only">{type}</span>
    </Icon>
  );
}
