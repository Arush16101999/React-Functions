import { useState } from "react";
import { Select } from "./Select";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
];

function App() {
  const [value, setValue] = useState<(typeof options)[0] | undefined>(
    options[0]
  );

  return (
    <>
      <Select options={options} value={value} onChange={(o) => setValue(o)} />
    </>
  );
}

export default App;
