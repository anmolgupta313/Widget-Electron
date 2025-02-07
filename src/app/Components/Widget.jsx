"use client";
import React, { useState, useRef } from "react";
import Moveable from "react-moveable";

function Widget() {
  const [tabBtnValue, settabBtnValue] = useState(1);
  const [tab, setTab] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [frameUrl, setFrameUrl] = useState(null);
const[widget,setWidget]=useState([])
  const iframeDivRef = useRef(null); // Added ref for iframe container

  const addTab = (e) => {
    e.preventDefault();
    setTab((prev) => [
      ...prev,
      {id:widget.length,
        widgetTab:[
             { tabId: tab.length + 1,
        query: inputValue,}
        ]
      
      },
    ]);

    // setFrameUrl(inputValue);
    setInputValue("");
  };

  const tabValue = (e, tabs) => {
    settabBtnValue(e.target.value);
    if (e.target.value == tabs.tabId) {
      setFrameUrl(tabs.query);
    } else {
      setFrameUrl("fail");
    }
  };

  const onChange = (e) => {
    setInputValue(e.target.value);
  };


  function w(){
    const f= tab.filter((tabs)=>{
return tabs.id===widget.length
    })

    const m=f.map((tabss)=>{
console.log(tabss.widgetTab,"tabsswidget")
    })

    console.log(f,"F")
  }

  // w()

  const addWidget=()=>{
    return setWidget((prev)=>{
return [...prev,{widgetId:widget.length+1,  WidgetTabs: tab.filter((tabss) => tabss.id === prev.length).map((tabss) => tabss.widgetTab)},
]
    })
  }
  console.log(tab,"tabss")

  // console.log(widget,"widget")
  return (
    <div className="main-widget-div p-4">
      <button onClick={addWidget}>Add Widget</button>
      <div className="input-div my-2">
        <input
          value={inputValue}
          onChange={onChange}
          type="text"
          placeholder="Enter URL"
          className="border p-1"
        />
        <button
          onClick={addTab}
          className="ml-2 bg-blue-500 text-white px-2 py-1"
        >
          Add
        </button>
      </div>
      {frameUrl && (
        <div
          className="main-div-tab-iframe"
          ref={iframeDivRef}
          style={{
            width: `400px`,
            height: `300px`,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "move",
            overflow: "hidden", // Prevent content overflow during resize
          }}
        >
          <div className="tabs-div flex gap-2 mb-4">
            {tab.map((tabs) => (
              <button
                key={tabs.tabId}
                onClick={(e) => tabValue(e, tabs)}
                value={tabs.tabId}
                className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
              >
                Tab {tabs.tabId}
              </button>
            ))}
          </div>

          <div
            ref={iframeDivRef}
            className="iframe-div border"
            style={{
              width: `400px`,
              height: `300px`,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "move",
              overflow: "hidden", // Prevent content overflow during resize
            }}
          >
            <iframe
              src={frameUrl}
              title="Embedded Content"
              style={{
                width: "100%", // Make iframe fill the parent
                height: "100%",
                border: "none",
              }}
            />
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
      )}
    </div>
  );
}

export default Widget;
