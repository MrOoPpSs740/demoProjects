import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropdownField from "./DropdownField";
import DynamicFabricFields from "./DynamicFabricFields";

const fabricOptions = [
  { value: "cotton", label: "Cotton" },
  { value: "silk", label: "Silk" },
  { value: "polyester", label: "Polyester" },
];

const trimOptions = [
  { value: "lace", label: "Lace" },
  { value: "zipper", label: "Zipper" },
];

const accessoryOptions = [
  { value: "button", label: "Button" },
  { value: "hook", label: "Hook" },
];

const Form = () => {
  const { control, register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      chinaFabric: false,
      fabrics: [{ name: "", requirement: "", unit: "M", processes: [] }],
      trims: [],
      accessories: [],
      majorFabric: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "fabrics" });
  const { fields: trimFields, append: appendTrim, remove: removeTrim } = useFieldArray({ control, name: "trims" });
  const { fields: accessoryFields, append: appendAccessory, remove: removeAccessory } = useFieldArray({ control, name: "accessories" });

  const watchChinaFabric = watch("chinaFabric");

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">T&A Data Submission Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Date Pickers */}
        <div>
          <label className="block text-gray-700">Start Date</label>
          <DatePicker
            selected={watch("startDate")}
            onChange={(date) => setValue("startDate", date)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block text-gray-700">End Date</label>
          <DatePicker
            selected={watch("endDate")}
            onChange={(date) => setValue("endDate", date)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* China Fabric */}
        <div>
          <label className="block text-gray-700">Is China Fabric Present?</label>
          <input type="checkbox" {...register("chinaFabric")} className="ml-2" />
        </div>
        {watchChinaFabric && (
          <DropdownField
            label="Select China Fabric"
            options={fabricOptions}
            isMulti
            onChange={(selected) =>
              setValue("chinaFabricDetails", selected.map((item) => item.value))
            }
          />
        )}

        {/* Fabric Section */}
        <DynamicFabricFields
          fields={fields}
          append={append}
          remove={remove}
          register={register}
        />

        {/* Major Fabric */}
        <div>
          <label className="block text-gray-700">Major Fabric</label>
          <select
            {...register("majorFabric")}
            className="w-full border rounded px-3 py-2"
          >
            <option value="">None</option>
            {fields.map((fabric, index) => (
              <option key={index} value={fabric.name}>
                {fabric.name || `Fabric ${index + 1}`}
              </option>
            ))}
          </select>
        </div>

        {/* Trims Section */}
        <div>
          <h3 className="text-xl font-semibold">Trims</h3>
          {trimFields.map((trim, index) => (
            <div key={trim.id} className="flex items-center mb-2">
              <input
                {...register(`trims.${index}.name`)}
                placeholder="Trim Name"
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeTrim(index)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendTrim({ name: "" })}
            className="text-blue-500 hover:underline"
          >
            Add More Trims
          </button>
        </div>

        {/* Accessories Section */}
        <div>
          <h3 className="text-xl font-semibold">Accessories</h3>
          {accessoryFields.map((accessory, index) => (
            <div key={accessory.id} className="flex items-center mb-2">
              <input
                {...register(`accessories.${index}.name`)}
                placeholder="Accessory Name"
                className="w-full border rounded px-3 py-2"
              />
              <button
                type="button"
                onClick={() => removeAccessory(index)}
                className="text-red-500 ml-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendAccessory({ name: "" })}
            className="text-blue-500 hover:underline"
          >
            Add More Accessories
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
