import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
export default undefined;

jest.mock("mobx-react", () => ({
  Provider: "div",
  inject: (storeName: string) => {
    const { createDummyConfig } = require("./util/test");
    const store: any = storeName === "config" ? createDummyConfig() : {};
    return (ClassType: any) => (props: any) => (
      <ClassType {...{ [storeName]: store }} {...props} />
    );
  },
  observer: (ClassType: any) => (props: any) => <ClassType {...props} />,
  Observer: (props: any) => props.render()
}));

jest.mock("react-transition-group", () => ({
  CSSTransition: "div",
  Transition: "div",
  TransitionGroup: "div"
}));

jest.mock("react-router", () => ({
  Route: "div",
  Switch: "div",
  Redirect: "div",
  withRouter: (ClassType: any): any => ClassType
}));

jest.mock("./store/config/Config", () => ({
  __esModules: true,
  AnimationSpeed: (() => {
    const Foo = function Foo() {};
    if ("getValues" in Foo) {
      Object.defineProperty(Foo, "getValues", {
        value: () => [1, 2, 3, 4, 5],
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      (Foo as any)["getValues"] = () => [1, 2, 3, 4, 5];
    }
    return Foo;
  })(),
  default: jest.fn().mockImplementation(() => {
    const { createDummyConfig } = require("./util/test");
    return createDummyConfig();
  })
}));
