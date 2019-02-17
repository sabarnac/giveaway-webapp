import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Config from "./store/config/Config";

configure({ adapter: new Adapter() });
export default undefined;

jest.mock(
  "mobx-react",
  (): object => ({
    Provider: "div",
    inject: (storeName: string): Function => {
      const { createDummyConfig } = require("./util/test");
      const store: any = storeName === "config" ? createDummyConfig() : {};
      return (ClassType: any): Function => (props: any): JSX.Element => (
        <ClassType {...{ [storeName]: store }} {...props} />
      );
    },
    observer: (ClassType: any): Function => (props: any): JSX.Element => (
      <ClassType {...props} />
    ),
    Observer: (props: any): JSX.Element => props.render()
  })
);

jest.mock(
  "react-transition-group",
  (): object => ({
    CSSTransition: "div",
    Transition: "div",
    TransitionGroup: "div"
  })
);

jest.mock(
  "react-router",
  (): object => ({
    Route: "div",
    Switch: "div",
    Redirect: "div",
    withRouter: (ClassType: any): any => ClassType
  })
);

jest.mock(
  "./store/config/Config",
  (): object => ({
    __esModules: true,
    AnimationSpeed: ((): Function => {
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
    default: jest.fn().mockImplementation(
      (): Config => {
        const { createDummyConfig } = require("./util/test");
        return createDummyConfig();
      }
    )
  })
);
