
export default function StatCard({ icon, label, value, gradient }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-5 sm:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div
          className={`p-2.5 sm:p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md`}
        >
          {icon}
        </div>
        <div className="text-right">
          <div className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-br from-ink to-ink/80 bg-clip-text text-transparent">
            {value}
          </div>
        </div>
      </div>
      <p className="font-body text-xs sm:text-sm text-ink/60 font-medium">
        {label}
      </p>
    </div>
  );
}