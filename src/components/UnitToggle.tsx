import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface UnitToggleProps<T extends string> {
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}

const UnitToggle = <T extends string>({
  value,
  options,
  onChange,
}: UnitToggleProps<T>) => {
  const handleChange = (
    _: React.MouseEvent<HTMLElement>,
    newValue: T | null,
  ) => {
    if (newValue !== null) onChange(newValue);
  };

  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleChange}
      size='small'
    >
      {options.map((option) => (
        <ToggleButton key={option.value} value={option.value}>
          {option.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default UnitToggle;
