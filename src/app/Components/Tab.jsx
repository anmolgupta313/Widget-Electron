import React from "react";

function Tab({ widgetTab, widgetId, addTab, tabValue, delTab }) {
  return (
    <div>
      {widgetTab.map((tabs) => (
        <button
          key={tabs.tabId}
          onClick={(e) => tabValue(e, widgetId, tabs)}
          value={tabs.tabId}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          Tab {tabs.tabId}
        </button>
      ))}

      <div className="add-btn-div">
        {" "}
        <button
          onClick={(e) => addTab(e, widgetId)}
          value={widgetId}
          className="ml-2 bg-blue-500 text-white px-2 py-1"
        >
          Add
        </button>
        <button
          onClick={(e) => {
            delTab(e, widgetId, widgetTab);
          }}
          value={widgetId}
        >
          Del
        </button>
      </div>
    </div>
  );
}

export default Tab;
