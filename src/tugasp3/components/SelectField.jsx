// components/SelectField.jsx
export default function SelectField({ label, value, onChange, options, error }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1.5 ml-1">
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl appearance-none transition-all duration-300 outline-none
        ${error 
          ? "border-red-500 focus:ring-4 focus:ring-red-100" 
          : "border-slate-100 focus:border-indigo-500 focus:shadow-md"}
        `}
      >
        <option value="">-- Pilih {label} --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500 font-medium mt-1.5 ml-1 italic">*{error}</p>}
    </div>
  );
}