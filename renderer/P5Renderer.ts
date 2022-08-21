import ReactReconciler from "react-reconciler";
import Instance from "./models/Instance";
import RootHostConfig from "./RootHostConfig";

const childHostContext = {
  setup: [] as Instance[],
  draw: [] as Instance[],
};

export const LocalRootHostConfig = new RootHostConfig(childHostContext);

const hostConfig = {
  supportsMutation: true,

  getRootHostContext: (rootElement: HTMLDivElement) => {
    LocalRootHostConfig.rootElement = rootElement;
    return LocalRootHostConfig;
  },
  getChildHostContext: () => childHostContext,
  prepareForCommit: (_rootElement: HTMLDivElement) => null,
  resetAfterCommit: (_rootElement: HTMLDivElement) => null,
  shouldSetTextContent: (_type: string, _props: {}) => null,
  /**
     This is where react-reconciler wants to create an instance of UI element in terms of the target. Since our target here is the DOM, we will create document.createElement and type is the argument that contains the type string like div or img or h1 etc. The initial values of domElement attributes can be set in this function from the newProps argument
     */
  createInstance: (
    type: string,
    newProps: any,
    root: any,
    context: any,
    fiber: any
  ) => {
    // console.log("createInstance", type, newProps, root, context, fiber);
    return new Instance(type, newProps);
  },
  createTextInstance: () => null,

  appendInitialChild: (parent: Instance, child: Instance) =>
    childHostContext[parent.type].push(child),

  appendChild: (parent: Instance, child: Instance) =>
    childHostContext[parent.type].push(child),

  finalizeInitialChildren: (instance) => {
    // console.log("finalizeInitialChildren", instance);
    if (instance.type === "setup") {
      LocalRootHostConfig.setup();
    }
    if (instance.type === "setup") {
      LocalRootHostConfig.draw();
    }
    return true;
  },
  commitMount: () => null,

  appendChildToContainer: (...args) => null,
  // console.log("appendChildToContainer", args),
  prepareUpdate: (...args) => {
    // console.log("prepareUpdate", args);
    // childHostContext.draw.splice(1,-1)
    return true; // if true commitUpdate will be called
  },
  commitUpdate(instance: Instance, updatePayload, type, oldProps, newProps) {
    // console.log("commitUpdate", instance, oldProps, newProps);

    childHostContext.draw.find((ins) => ins.id === instance.id);
    instance.props = newProps;
    // console.log(childHostContext, "childHostContext");

    return true;
  },

  commitTextUpdate: (textInstance, oldText, newText) => null,

  removeChild: (parentInstance: Instance, child: Instance) => {
    // console.log("removeChild", parentInstance, child);
    const index = childHostContext[parentInstance.type].findIndex(
      (el: Instance) => el.id === child.id
    );

    childHostContext[parentInstance.type].splice(index, 1);
  },
  removeChildFromContainer: (_, instance: Instance) => {
    console.log("removeChildFromContainer", instance);
    childHostContext[instance.type].splice(1, -1);
  },

  insertBefore: (parent: Instance, before: Instance, newInst: Instance) => {
    const insertIndex = childHostContext[parent.type].findIndex(
      (i) => i.id === before.id
    );
    childHostContext[parent.type].splice(insertIndex + 1, 0, newInst);
  },
  detachDeletedInstance: () => null,
  clearContainer: (...args) => {
    // console.log("clearContainer", args);
  },
};

const ReactReconcilerInst = ReactReconciler(hostConfig);

const P5Renderer = {
  render: (reactElement: any, domElement: any, callback?: any) => {
    // Create a root Container if it doesnt exist
    if (!domElement._rootContainer) {
      domElement._rootContainer = ReactReconcilerInst.createContainer(
        domElement,
        false
      );
    }
    // console.log("render", reactElement, domElement);

    // update the root Container
    return ReactReconcilerInst.updateContainer(
      reactElement,
      domElement._rootContainer,
      null,
      callback
    );
  },
};

export default P5Renderer;
