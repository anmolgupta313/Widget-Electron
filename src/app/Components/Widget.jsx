"use client";
import React, { useState, useRef } from "react";
import Moveable from "react-moveable";
import Tab from "./Tab";

function Widget() {
  const [inputValue, setInputValue] = useState("");
  const [tabV, setTabV] = useState();
  const [widget, setWidget] = useState([]);
  const iframeDivRef = useRef(null); // Added ref for iframe container

  const addWidget = () => {
    return setWidget((prev) => {
      return [
        ...prev,
        {
          widgetId: widget.length + 1,
          WidgetTabs: [],
          frameUrl: "",
        },
      ];
    });
  };

  const addTab = (e, widgetId) => {
    e.preventDefault();

    setInputValue("");

    setWidget((prev) => {
      return prev.map((w) => {
        if (w.widgetId == widgetId) {
          return {
            ...w,
            WidgetTabs: [
              ...w.WidgetTabs,
              { tabId: w.WidgetTabs.length + 1, query: inputValue },
            ],
            frameUrl: inputValue,
          };
        }
        return w;
      });
    });
  };

  const tabValue = (e, widgetId, tabs) => {
    setTabV(e.target.value);
    setWidget((prev) => {
      return prev.map((w) => {
        return w.widgetId === widgetId ? { ...w, frameUrl: tabs.query } : w;
      });
    });
  };

  const delTab = (e, widgetId, widgetTab) => {
    if (e.target.value != widgetId) return;

    if (e.target.value == widgetId) {
      const filWidget = widgetTab.filter((tab) => {
        return tab.tabId != tabV;
      });

      const updatedTabs = filWidget.map((tab, index) => ({
        ...tab,
        tabId: index + 1, // Assign new sequential tabId
      }));

      console.log(updatedTabs, "updated");
      setWidget((prev) => {
        return prev.map((w) => {
          if (w.widgetId == widgetId) {
            return {
              ...w,
              WidgetTabs: updatedTabs,
              frameUrl: updatedTabs.length
                ? updatedTabs[updatedTabs.length - 1].query
                : "",
            };
          }
          return w;
        });
      });
      console.log(filWidget, "filWidget");
      console.log(tabV);
      console.log(widgetTab, "widgteTab");
    }
    return widget;
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      className="main-widget-div p-4"
      style={{ marginTop: "50%", width: "100%" }}
    >
      <button onClick={addWidget}>Add Widget</button>
      <div className="input-div my-2">
        <input
          value={inputValue}
          onChange={onChange}
          type="text"
          placeholder="Enter URL"
          className="border p-1"
        />
      </div>

      <div
        className="main-div-tab-iframe"
        ref={iframeDivRef}
        style={{
          width: `100%`,
          height: `300px`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "move",
          overflow: "hidden", // Prevent content overflow during resize
        }}
      >
        <div
          ref={iframeDivRef}
          className="iframe-div border"
          style={{
            width: `100%`,
            height: `300px`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "move",
            overflow: "hidden", // Prevent content overflow during resize
          }}
        >
          {widget.map((widget) => {
            return (
              <div
                className="widget-main-div"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div
                  className="widget-tab-div"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Tab
                    widgetTab={widget.WidgetTabs}
                    widgetId={widget.widgetId}
                    addTab={addTab}
                    tabValue={tabValue}
                    delTab={delTab}
                  />
                </div>

                <div className="widget-i-frame-div">
                  {" "}
                  <iframe
                    src={widget.frameUrl}
                    title="Embedded Content"
                    style={{
                      width: "100%", // Make iframe fill the parent
                      height: "100%",
                      border: "none",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <Moveable
          target={iframeDivRef.current} // Target using ref
          origin={true}
          edge={false}
          draggable={true}
          throttleDrag={0}
          onDrag={({ target, transform }) => {
            target.style.transform = transform;
          }}
          onResize={({ target, width, height, delta }) => {
            if (delta[0]) target.style.width = `${width}px`;
            if (delta[1]) target.style.height = `${height}px`;

            // Resize the iframe as well
            const iframe = target.querySelector("iframe");
            if (iframe) {
              iframe.style.width = "100%";
              iframe.style.height = "100%";
            }
          }}
          keepRatio={true}
          resizable={true}
          throttleResize={0}
        />
      </div>
    </div>
  );
}

export default Widget;
