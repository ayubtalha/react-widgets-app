import React, { useState } from "react";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    // const onTitleClick = function (index) {
    // console.log("clicked", index);
    setActiveIndex(index);
  };

  const renderedList = items.map((item, index) => {
    const active = index === activeIndex ? "active" : "";

    return (
      <React.Fragment key={item.title}>
        <div
          className={"title" + active}
          //className={`title ${active}`}
          onClick={() => onTitleClick(index)}
        >
          <i className="dropdown icon"></i>
          {item.title}
        </div>

        <div
          // className={"content" + active}
          className={`content ${active}`}
        >
          <p>{item.content}</p>
        </div>
      </React.Fragment>
    );
  });
  return (
    <div className="ui styled accordion">
      {renderedList}
      {/* <h1>{activeIndex}</h1> */}
    </div>
  );
};

export default Accordion;
