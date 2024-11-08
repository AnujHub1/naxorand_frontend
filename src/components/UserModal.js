export default function UserModal({ user, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4">
          {user.firstName}'s Points History
        </h2>
        <ul>
          {user.history.map((record, index) => (
            <li key={index}>
              {record.date}: {record.points} points
            </li>
          ))}
        </ul>
        <button
          onClick={onClose}
          className="mt-4 p-2 bg-blue-600 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
