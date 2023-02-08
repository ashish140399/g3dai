import styled from "styled-components";
import { styled as muistyled } from "@mui/material/styles";
import Slider, {
    SliderThumb,
    SliderValueLabelProps,
} from "@mui/material/Slider";
export const PageHeading = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 38px;
    margin-bottom: 30px;
`;
export const LabelHead = styled.div`
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 8px;
`;
export const AddMechanic = styled.div``;
export const ScoreMechanic = styled.div`
    position: relative;
    .sliderbx {
        .rnge {
            display: flex;
            align-items: Center;
            justify-content: space-between;
            font-weight: 500;
            font-size: 10px;
        }
    }
    .backbutton {
        position: absolute;
        top: -30px;
        left: 0px;
        cursor: pointer;
        height: 24px;
        img {
            height: 100%;
            width: auto;
        }
    }
`;

export const IOSSlider = muistyled(Slider)(({ theme }) => ({
    color: "rgba(255,255,255,0.3)",
    height: 3,
    padding: "15px 0",
    "& .MuiSlider-thumb": {
        height: 28,
        width: 28,
        backgroundColor: "#FF60DD",

        "&:focus, &:hover, &.Mui-active": {
            boxShadow:
                "0 3px 1px rgba(0,0,0,0.1),0 4px 8px rgba(0,0,0,0.3),0 0 0 1px rgba(0,0,0,0.02)",
            // Reset on touch devices, it doesn't add specificity
        },
    },
    "& .MuiSlider-valueLabel": {
        fontSize: 12,
        fontWeight: "normal",
        top: 26,
        backgroundColor: "unset",
        color: "#fff",
        "&:before": {
            display: "none",
        },
        "& *": {
            background: "transparent",
            color: "#fff",
        },
    },
    "& .MuiSlider-track": {
        border: "none",
    },
    "& .MuiSlider-rail": {
        opacity: 0.5,
        backgroundColor: "#424D6D",
    },
    "& .MuiSlider-mark": {
        backgroundColor: "#bfbfbf",
        height: 8,
        width: 1,
        "&.MuiSlider-markActive": {
            opacity: 1,
            backgroundColor: "currentColor",
        },
    },
}));
