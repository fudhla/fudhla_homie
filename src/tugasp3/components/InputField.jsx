// components/InputField.jsx
export default function InputField({ label, type, value, onChange, error, placeholder }) {
  return (
    <div className="mb-5">
      <label className="block text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1.5 ml-1">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 bg-white border-2 rounded-xl transition-all duration-300 outline-none
        ${error 
          ? "border-red-500 focus:ring-4 focus:ring-red-100" 
          : "border-slate-100 focus:border-indigo-500 focus:shadow-md"}
        `}
      />
      {error && <p className="text-xs text-red-500 font-medium mt-1.5 ml-1 italic">*{error}</p>}
    </div>
  );
}