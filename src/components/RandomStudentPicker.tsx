import { useState } from "react";

interface RandomStudentPickerProps {
  students: string[];
}

const RandomStudentPicker: React.FC<RandomStudentPickerProps> = ({
  students,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const pickRandomStudent = () => {
    const randomIndex = Math.floor(Math.random() * students.length);
    setSelectedStudent(students[randomIndex]);
  };

  return (
    <div className="mt-6">
      {selectedStudent && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-green-500">
            Pasirinktas studentas:
          </h2>
          <p className="text-xl font-semibold text-yellow-400 mt-2">
            {selectedStudent}
          </p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">
        Studentai Paskaitoje
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left bg-gray-800 text-gray-300 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-200">
              <th className="px-4 py-2 text-sm font-semibold">#</th>
              <th className="px-4 py-2 text-sm font-semibold">
                Vardas, Pavardė
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr
                key={index}
                className="hover:bg-gray-700 transition duration-200"
              >
                <td className="px-4 py-2 text-sm font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-medium text-yellow-400">
                  {student}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center mt-6">
        <button
          onClick={pickRandomStudent}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Pasirinkti atsitiktinį studentą
        </button>
      </div>
    </div>
  );
};

export default RandomStudentPicker;
