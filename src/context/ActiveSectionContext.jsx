import { createContext, useContext, useState, useMemo } from "react";

const ActiveSectionContext = createContext({
  activeSection: "home",
  setActiveSection: () => {},
});

export function ActiveSectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState("home");
  const value = useMemo(() => ({ activeSection, setActiveSection }), [activeSection]);
  return (
    <ActiveSectionContext.Provider value={value}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSection() {
  return useContext(ActiveSectionContext);
}
