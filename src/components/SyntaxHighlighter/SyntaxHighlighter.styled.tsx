import { styled } from "@storybook/theming";
import { motion } from "framer-motion";

export const Code = styled(motion.div)`
  position: relative;
  z-index: 2;
`;

export const Container = styled.div<{ width: string }>`
  position: relative;
  box-sizing: border-box;
  background: #171c23;
  width: ${({ width }) => width};
  height: 100%;
  overflow: hidden;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 6px;

  && {
    pre {
      background: transparent !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`;

export const Backdrop = styled(motion.div)`
  background: #143046;
  position: absolute;
  z-index: 1;
  left: 0;
  width: 100%;
  height: 200px;
`;
