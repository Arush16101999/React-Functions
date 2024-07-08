import { useState } from "react";

import { MultiSelect, SelectOption } from "./MultiSelect";

const options = [
  { label: "Option 1", value: 1 },
  { label: "Option 2", value: 2 },
  { label: "Option 3", value: 3 },
  { label: "Option 4", value: 4 },
  { label: "Option 5", value: 5 },
];

function App() {
  // const [value, setValue] = useState<SelectOption | undefined>(options[0]);
  const [value1, setValue1] = useState<SelectOption[] | undefined>([
    options[0],
  ]);
  const [value2, setValue2] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
      {/* <Select options={options} value={value} onChange={(o) => setValue(o)} /> */}
      <MultiSelect
        multiple
        options={options}
        value={value1}
        onChange={(o) => setValue1(o)}
      />{" "}
      <br />
      <MultiSelect
        options={options}
        value={value2}
        onChange={(o) => setValue2(o)}
      />
    </>
  );
}

export default App;
