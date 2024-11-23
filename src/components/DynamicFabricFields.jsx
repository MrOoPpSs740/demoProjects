import React from "react";

const DynamicFabricFields = ({ fields, append, remove, register }) => {
  return (
    <div>
      {fields.map((field, index) => (
        <div key={field.id} className="border p-4 rounded mb-4 bg-white">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h4>Fabric {index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:underline"
            >
              Remove
            </button>
          </div>

          {/* Fabric Name */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Fabric Name</label>
            <input
              {...register(`fabrics.${index}.name`)}
              placeholder="Fabric Name"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Per Piece Requirement */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Per Piece Requirement</label>
            <input
              {...register(`fabrics.${index}.requirement`)}
              placeholder="Per Piece Requirement"
              type="number"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Unit Selection */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Choose Unit</label>
            <select
              {...register(`fabrics.${index}.unit`)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="M">M</option>
              <option value="Kg">Kg</option>
            </select>
          </div>

          {/* Processes */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Processes</label>
            <select
              {...register(`fabrics.${index}.processes`)}
              multiple
              className="w-full border rounded px-3 py-2"
            >
              {/* Add dynamic options for processes */}
              <option value="Dyeing">Dyeing</option>
              <option value="Printing">Printing</option>
              <option value="Finishing">Finishing</option>
            </select>
          </div>

          {/* Color and Quantity */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Color and Quantity</label>
            <input
              {...register(`fabrics.${index}.color`)}
              placeholder="Color"
              className="w-full border rounded px-3 py-2 mb-2"
            />
            <input
              {...register(`fabrics.${index}.quantity`)}
              placeholder="Quantity"
              type="number"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Stages to Be Skipped */}
          <div className="mb-4">
            <label className="block font-semibold mb-2">Stages to Be Skipped</label>
            <select
              {...register(`fabrics.${index}.stagesSkipped`)}
              multiple
              className="w-full border rounded px-3 py-2"
            >
              {/* Add dynamic options for stages */}
              <option value="Cutting">Cutting</option>
              <option value="Stitching">Stitching</option>
              <option value="Packing">Packing</option>
            </select>
          </div>
        </div>
      ))}

      {/* Add More Button */}
      <button
        type="button"
        onClick={() =>
          append({
            name: "",
            requirement: "",
            unit: "M",
            processes: [],
            color: "",
            quantity: "",
            stagesSkipped: [],
          })
        }
        className="text-blue-500 hover:underline"
      >
        Add More Fabrics
      </button>
    </div>
  );
};

export default DynamicFabricFields;
