import React from "react";
import { create } from "react-test-renderer";
import Details from "../Details";

test("snapshot", () => {
  // TestRenderer.create() creates a TestRenderer instance
  // which has the following methods : testRenderer.toJSON
  // testRenderer.getInstance ...
  const component = create(<Details />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("shows modal when toggleModal is called", () => {
  const component = create(<Details />);
  const instance = component.getInstance(<Details />);

  expect(instance.state.showModal).toBe(false);
  instance.toggleModal();
  expect(instance.state.showModal).toBe(true);
});
