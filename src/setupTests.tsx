import React from "react";

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
        writable: true,
      },
      flatMap: {
        configurable: true,
        value: function flatMap() {
          return Array.prototype.map.apply(this, arguments as any).flat();
        },
        writable: true,
      },
    });
  }
})();

jest.mock(
  "./store/config/RandomGenerator",
  (): object => ({
    shuffle: (arr: any[]) => [...arr],
    pick: (arr: any[]) => arr[0],
  }),
);

jest.mock(
  "mobx-react",
  (): object => ({
    Provider: "div",
    inject: (storeName: string): Function => {
      const mockConfig: any = {
        name: "Foobar Giveaway",
        message: ["foobar1", "foobar2", "foobar3", "foobar4"],
        allParticipants: new Array(4)
          .fill(0)
          .map((_: number, index: number) => index + 1)
          .map((num: number) => ({
            name: `fozbaz-${num}`,
            properName: `Fozbaz ${num}w`,
            avatar: {
              url: `foobar-${num}`,
              altText: `barfoo-${num}`,
            },
          })),
        participantsPerMatch: 2,
        speed: 1,
        getMessageIndex: () => 0,
        getFormattedMessage: () => "formatted foobar message",
        getRandomMessage: () => "foobar message",
      };
      mockConfig.getInstance = () => mockConfig;
      const store: any = storeName === "config" ? mockConfig : {};
      return (ClassType: any): Function => (props: any): any => (
        <ClassType {...{ [storeName]: store }} {...props} />
      );
    },
    observer: (ClassType: any): Function => (props: any): any => (
      <ClassType {...props} />
    ),
    Observer: (props: any): any =>
      props.children ? props.children() : props.render(),
  }),
);

jest.mock(
  "react-transition-group",
  (): object => ({
    CSSTransition: "div",
    Transition: "div",
    TransitionGroup: "div",
  }),
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
    ),
  }),
);

jest.mock(
  "./store/config/AnimationSpeed",
  (): object => {
    const animationSpeed: any = {};
    animationSpeed.getValues = () => [1, 2, 3, 4, 5];
    animationSpeed.get = (speed: string) => 1;
    return animationSpeed;
  },
);

jest.mock(
  "react-i18next",
  (): object => {
    const React = require("react");

    const hasChildren = (node: any): boolean =>
      node && (node.children || (node.props && node.props.children));

    const getChildren = (node: any): any =>
      node && node.children
        ? node.children
        : node.props && node.props.children
        ? node.props.children
        : null;

    const renderNodes = (reactNodes: any): any => {
      if (typeof reactNodes === "string") {
        return reactNodes;
      }

      return Object.keys(reactNodes).map((key, i) => {
        const child = reactNodes[key];
        const isElement = React.isValidElement(child);

        if (typeof child === "string") {
          return child;
        }
        if (hasChildren(child)) {
          const inner = renderNodes(getChildren(child));
          return React.cloneElement(child, { ...child.props, key: i }, inner);
        }
        if (typeof child === "object" && !isElement) {
          return Object.keys(child).reduce(
            (str, childKey) => `${str}${child[childKey]}`,
            "",
          );
        }

        return child;
      });
    };

    const useMock: any = [(k: any) => k, {}];
    useMock.t = (k: any) => k;
    useMock.i18n = {};

    return {
      // this mock makes sure any components using the translate HoC receive the t function as a prop
      withTranslation: () => (Component: any): any => (props: any): any => (
        <Component t={(k: any): any => k} {...props} />
      ),
      Trans: ({ children }: any) => renderNodes(children),
      Translation: ({ children }: any) =>
        children((k: any): any => k, { i18n: {} }),
      useTranslation: () => useMock,
    };
  },
);

jest.mock(
  "./store/config/Config",
  (): object => {
    const mockConfig: any = {
      name: "Foobar Giveaway",
      message: ["foobar1", "foobar2", "foobar3", "foobar4"],
      allParticipants: new Array(4)
        .fill(0)
        .map((_: number, index: number) => index + 1)
        .map((num: number) => ({
          name: `fozbaz-${num}`,
          properName: `Fozbaz ${num}w`,
          avatar: {
            url: `foobar-${num}`,
            altText: `barfoo-${num}`,
          },
        })),
      participantsPerMatch: 2,
      speed: 1,
      getMessageIndex: () => 0,
      getFormattedMessage: () => "formatted foobar message",
      getRandomMessage: () => "foobar message",
    };
    mockConfig.getInstance = () => mockConfig;
    return mockConfig;
  },
);
