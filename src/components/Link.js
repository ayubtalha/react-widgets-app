import React from "react";

const Link = ({ href, className, children }) => {
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey) {
      return;
    }

    event.preventDefault();

    //just change the url and dont reload whole page
    window.history.pushState({}, "", href);

    // data has changed, it gives the route notificatation that
    // path has changed so change the data as per href
    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <a onClick={onClick} href={href} className={className}>
      {children}
    </a>
  );
};

export default Link;
