import { useState } from "react";

interface RandomStudentPickerProps {
  students: string[];
}

const RandomStudentPicker: React.FC<RandomStudentPickerProps> = ({
  students,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  const pickRandomStudent = () => {
    setIsPicking(true);
    setSelectedStudent(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * students.length);
      setSelectedStudent(students[randomIndex]);
      setIsPicking(false);
    }, 3000);
  };

  return (
    <div className="mt-6">
      {selectedStudent && !isPicking && (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-600">
            Pasirinktas studentas:
          </h2>
          <p className="text-xl font-semibold text-gray-800 mt-2">
            {selectedStudent}
          </p>
        </div>
      )}
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-600">
        Studentai Paskaitoje
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left bg-gray-200 text-gray-800 rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700">
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
                className="hover:bg-gray-300 transition duration-200"
              >
                <td className="px-4 py-2 text-sm font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-700">
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
          className="px-8 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-lg hover:bg-gray-400 transition duration-300"
          disabled={isPicking}
        >
          {isPicking ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-gray-400 mr-2"></div>
              <span>Pasirenkama...</span>
            </div>
          ) : (
            "Pasirinkti atsitiktinį studentą"
          )}
        </button>
      </div>
    </div>
  );
};

export default RandomStudentPicker;
