import { useState } from "react";

interface RandomStudentPickerProps {
  students: string[];
}

const RandomStudentPicker: React.FC<RandomStudentPickerProps> = ({
  students,
}) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [isPicking, setIsPicking] = useState(false);

  // Blue palette:
  // Deep blue: #23395d
  // Soft blue: #b7c9e2
  // Accent blue: #4169e1

  const pickRandomStudent = () => {
    setIsPicking(true);
    setSelectedStudent(null);

    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * students.length);
      setSelectedStudent(students[randomIndex]);
      setIsPicking(false);
    }, 5000);
  };

  return (
    <div className="mt-6">
      <div className="mb-6 text-center min-h-[100px] flex flex-col items-center justify-center">
        {isPicking ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-b-8 border-[#4169e1] mb-4 border-solid"></div>
            <span className="text-[#4169e1] font-bold tracking-wide animate-pulse text-xl">
              Pasirenkama...
            </span>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-[#23395d] mb-2 drop-shadow">
              Pasirinktas studentas:
            </h2>
            {selectedStudent && (
              <p
                className="text-3xl font-extrabold px-6 py-2 rounded-lg shadow-lg mt-2 animate-bounce"
                style={{
                  background:
                    "linear-gradient(90deg, #b7c9e2 60%, #4169e1 100%)",
                  color: "#23395d",
                  border: "2px solid #4169e1",
                  letterSpacing: "0.04em",
                  textShadow: "0 2px 10px #b7c9e2, 0 1px 0 #4169e1",
                }}
              >
                {selectedStudent}
              </p>
            )}
          </>
        )}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center text-[#23395d] drop-shadow">
        Studentai Paskaitoje
      </h2>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full text-left bg-[#b7c9e2] text-[#23395d] rounded-lg shadow-lg">
          <thead>
            <tr className="bg-[#4169e1] text-white">
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
                className="hover:bg-[#4169e1] hover:text-white transition duration-200"
              >
                <td className="px-4 py-2 text-sm font-medium">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-bold text-[#23395d]">
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
          className="px-8 py-3 bg-[#4169e1] text-white font-semibold rounded-lg shadow-lg hover:bg-[#23395d] hover:text-[#b7c9e2] transition duration-300"
          disabled={isPicking}
        >
          Pasirinkti atsitiktinį studentą
        </button>
      </div>
    </div>
  );
};

export default RandomStudentPicker;
