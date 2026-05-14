export default function PageHeader({
  title,
  breadcrumb = [],
  children,
  onAdd,
  addLabel,
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      
      {/* Left Section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          {title}
        </h1>

        <div className="flex items-center gap-2 text-xs font-medium mt-1">
          {Array.isArray(breadcrumb) ? (
            breadcrumb.map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <span
                  className={
                    index === breadcrumb.length - 1
                      ? "text-[#EC4899]" 
                      : "text-[#E9D5DA]/40" 
                  }
                >
                  {item}
                </span>
                {index < breadcrumb.length - 1 && (
                  <span className="text-[#E9D5DA]/20">/</span>
                )}
              </span>
            ))
          ) : (
            <span className="text-[#E9D5DA]/40">{breadcrumb}</span>
          )}
        </div>
      </div>

      {/* Right Section */}
      <div>
        {children ? (
          children
        ) : onAdd ? (
          <button
            onClick={onAdd}
            className="bg-[#EC4899] hover:bg-[#D13D81] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#EC4899]/20 transition-all active:scale-95"
          >
            {addLabel || "+ Add New"}
          </button>
        ) : null}
      </div>
    </div>
  );
}