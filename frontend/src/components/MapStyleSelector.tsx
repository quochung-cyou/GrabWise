import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
  import { MAP_STYLES } from "./constants";
  interface MapStyleSelectorProps {
    value: keyof typeof MAP_STYLES;
    onChange: (value: keyof typeof MAP_STYLES) => void;
  }
  export const MapStyleSelector = ({ value, onChange }: MapStyleSelectorProps) => (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Map Style" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="streets">Streets</SelectItem>
        <SelectItem value="satellite">Satellite</SelectItem>
      </SelectContent>
    </Select>
  );