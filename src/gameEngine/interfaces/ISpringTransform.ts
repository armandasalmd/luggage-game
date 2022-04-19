import { SpringConfig, SpringValue } from "react-spring";

export interface ISpringTransform {
  x: SpringValue<number> | number;
  y: SpringValue<number> | number;
  rot?: SpringValue<number> | number;
  scale: SpringValue<number> | number;
  delay?: SpringValue<number> | number;
  config?: SpringConfig;
}