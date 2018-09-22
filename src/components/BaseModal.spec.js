import { mount } from "@vue/test-utils";
import BaseModal from "./BaseModal";

describe("BaseModal tests", function() {
  it("is invisible by default", function() {
    const wrapper = mount(BaseModal, {});
    expect(wrapper.isVisible()).toBe(false);
  });
  it("accepts a show prop that makes it visible", function() {
    const wrapper = mount(BaseModal, {
      propsData: {
        show: true
      }
    });
    expect(wrapper.isVisible()).toBe(true);
  });
  it("accepts a slot", function() {
    const wrapper = mount(BaseModal, {
      propsData: {
        show: true
      },
      slots: {
        default: '<p class="content">Hello world</p>'
      }
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(wrapper.find(".content").text()).toBe("Hello world");
  });
  it("emits a close event when clicking outside the modal", function() {
    const closeListener = jest.fn();
    const wrapper = mount(BaseModal, {
      propsData: {
        show: true
      },
      listeners: {
        close: closeListener
      }
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(closeListener).not.toHaveBeenCalled();
    wrapper.trigger("click");
    expect(closeListener).toHaveBeenCalled();
  });
  it("does not emit a close event when clicking inside the modal", function() {
    const closeListener = jest.fn();
    const wrapper = mount(BaseModal, {
      propsData: {
        show: true
      },
      listeners: {
        close: closeListener
      }
    });
    expect(wrapper.isVisible()).toBe(true);
    wrapper.find(".modal-container").trigger("click");
    expect(closeListener).not.toHaveBeenCalled();
  });
  it("emits a close event when pressing ESC", function() {
    const closeListener = jest.fn();
    const wrapper = mount(BaseModal, {
      attachToDocument: true, // required for keydown event
      propsData: {
        show: true
      },
      listeners: {
        close: closeListener
      }
    });
    expect(wrapper.isVisible()).toBe(true);
    expect(closeListener).not.toHaveBeenCalled();
    wrapper.trigger("keydown.esc");
    expect(closeListener).toHaveBeenCalled();
  });
  it("does not emit a close event when pressing ESC while the component is closed", function() {
    const closeListener = jest.fn();
    const wrapper = mount(BaseModal, {
      attachToDocument: true, // required for keydown event
      listeners: {
        close: closeListener
      }
    });
    wrapper.trigger("keydown.esc");
    expect(closeListener).not.toHaveBeenCalled();
  });
});
