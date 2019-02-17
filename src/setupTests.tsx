import React from "react";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
export default undefined;

(() => {
  if (!Array.prototype.flat) {
    Object.defineProperties(Array.prototype, {
      flat: {
        configurable: true,
        value: function flat() {
          let depth = isNaN(arguments[0]) ? 1 : Number(arguments[0]);
          const stack = Array.prototype.slice.call(this);
          const result = [];

          while (depth && stack.length) {
            const next = stack.pop();

            if (Object(next) instanceof Array) {
              --depth;

              Array.prototype.push.apply(stack, next);
            } else {
              result.unshift(next);
            }
          }

          return result.concat(stack);
        },
        writable: true
      },
      flatMap: {
        configurable: true,
        value: function flatMap() {
          return Array.prototype.map.apply(this, arguments as any).flat();
        },
        writable: true
      }
    });
  }
})();

jest.mock(
  "mobx-react",
  (): object => ({
    Provider: "div",
    inject: (storeName: string): Function => {
      const { createDummyConfig } = require("./util/test");
      const store: any = storeName === "config" ? createDummyConfig() : {};
      return (ClassType: any): Function => (props: any): any => (
        <ClassType {...{ [storeName]: store }} {...props} />
      );
    },
    observer: (ClassType: any): Function => (props: any): any => (
      <ClassType {...props} />
    ),
    Observer: (props: any): any => props.render()
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
    withRouter: (ClassType: any): Function => (props: any): any => (
      <ClassType
        {...props}
        location={{ search: "", pathname: "", hash: "", state: null }}
      />
    )
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
      (): any => {
        const { createDummyConfig } = require("./util/test");
        return createDummyConfig();
      }
    )
  })
);
