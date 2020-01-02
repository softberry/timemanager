import { configure } from "@storybook/react";

configure(require.context("../src/__stories", true, /\.stories\.tsx$/), module);
