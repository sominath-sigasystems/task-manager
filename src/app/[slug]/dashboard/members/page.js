export default function TemplatePage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Page Title</h1>
          <p className="text-sm text-slate-500">
            Short description about this section.
          </p>
        </div>

        <button className="px-4 py-2 bg-black text-white text-sm font-semibold rounded-lg hover:bg-slate-800 transition">
          + Add New
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Total Items</p>
          <p className="text-2xl font-bold mt-2">128</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Active</p>
          <p className="text-2xl font-bold mt-2 text-emerald-600">112</p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <p className="text-sm text-slate-500">Pending</p>
          <p className="text-2xl font-bold mt-2 text-amber-500">16</p>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Name
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Role
              </th>
              <th className="px-6 py-4 text-xs font-bold uppercase text-slate-400">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase text-slate-400">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y">
            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-medium text-slate-900">John Doe</td>
              <td className="px-6 py-4 text-slate-600">Admin</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded-md bg-emerald-100 text-emerald-600 font-semibold">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-medium text-slate-900">
                Jane Smith
              </td>
              <td className="px-6 py-4 text-slate-600">Editor</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded-md bg-amber-100 text-amber-600 font-semibold">
                  Pending
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>

            <tr className="hover:bg-slate-50 transition">
              <td className="px-6 py-4 font-medium text-slate-900">
                Mark Wilson
              </td>
              <td className="px-6 py-4 text-slate-600">Viewer</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded-md bg-slate-100 text-slate-600 font-semibold">
                  Inactive
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <button className="text-sm text-blue-600 hover:underline">
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Bottom Card Section */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-2">Activity Summary</h3>
          <p className="text-sm text-slate-500">
            Overview of recent activities within this section.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm">
          <h3 className="font-bold text-lg mb-2">System Information</h3>
          <p className="text-sm text-slate-500">
            Placeholder area for future analytics or system data.
          </p>
        </div>
      </div>
    </div>
  );
}
