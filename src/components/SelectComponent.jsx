import { Select, SelectItem } from "@nextui-org/select"

export const SelectComponent = ({ data, name, onChange, label, defaultKey, placeholder }) => {

  const defaultValueKey = defaultKey ? [ defaultKey ] : []

  return (
    <Select
      items={data}
      placeholder={ placeholder }
      label={ label }
      className="max-w-xs"
      aria-label="select"
      name={ name }
      size="sm"
      onChange={ onChange }
      defaultSelectedKeys={ defaultValueKey }
      fullWidth
      classNames={{
        label: "group-data-[filled=true]:-translate-y-5 text-md text-gray-400",
        trigger: "data-[hover=true]:bg-primary/40 data-[hover=true]:text-white",
        listboxWrapper: "max-h-[400px]",
      }}
      listboxProps={{
        itemClasses: {
          base: [
            "text-default-500",
            "transition-opacity",
            "data-[hover=true]:text-foreground",
            "data-[hover=true]:bg-default-100",
            "dark:data-[hover=true]:bg-default-50",
            "data-[selectable=true]:focus:bg-default-50",
            "data-[pressed=true]:opacity-70",
            "data-[focus-visible=true]:ring-default-500",
          ],
        },
      }}
    >
      {(data) => (
        <SelectItem key={data.value} textValue={ data.name }>
          <div className="flex gap-2 items-center text-right" >
            { data.icon && data.icon }
            <div className="flex flex-col">
              <span className="text-small">{data.name}</span>
            </div>
          </div>
        </SelectItem>
      )}
    </Select>
  )
}