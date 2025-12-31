import React from 'react';

export const Badge = ({ severity }) => {
  const styles = {
    red: "bg-danger-50 text-danger-700 border-danger-100",
    yellow: "bg-warning-50 text-warning-700 border-warning-100",
    blue: "bg-primary-50 text-primary-700 border-primary-100",
    gray: "bg-secondary-100 text-secondary-600 border-secondary-200",
  };

  const mapSeverity = () => {
    if (severity === 'Severe') return styles.red;
    if (severity === 'Moderate') return styles.yellow;
    if (severity === 'Minor') return styles.blue;
    return styles.gray;
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${mapSeverity()}`}>
      {severity}
    </span>
  );
};