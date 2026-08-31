import { createContext, useContext, useState } from "react";

const IssueContext = createContext();

export function IssueProvider({ children }) {

  const [issues, setIssues] = useState([]);

  const addIssue = (newIssue) => {

    console.log("Received Issue:", newIssue);

    const issue = {
      id: Date.now(),
      ...newIssue,
      status: "Pending",
      createdAt: new Date().toLocaleString(),
    };

    console.log("Stored Issue:", issue);

    setIssues((prev) => [issue, ...prev]);
  };

  const updateStatus = (id, status) => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id
          ? {
              ...issue,
              status,
            }
          : issue
      )
    );
  };

  const deleteIssue = (id) => {
    setIssues((prev) =>
      prev.filter((issue) => issue.id !== id)
    );
  };

  return (
    <IssueContext.Provider
      value={{
        issues,
        addIssue,
        updateStatus,
        deleteIssue,
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  return useContext(IssueContext);
}