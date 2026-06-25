import Tooltip from "@mui/material/Tooltip";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

interface UnitToggleProps<T extends string> {
  value: T;
  options: { value: T; label: string; tooltip: string }[];
  onChange: (value: T) => void;
  ariaLabel: string;
}

const UnitToggle = <T extends string>({
  value,
  options,
  onChange,
  ariaLabel,
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
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Tooltip key={option.value} title={option.tooltip} arrow>
          <ToggleButton value={option.value}>{option.label}</ToggleButton>
        </Tooltip>
      ))}
    </ToggleButtonGroup>
  );
};

export default UnitToggle;
