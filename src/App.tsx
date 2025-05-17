import { useState } from "react";
import UploadExcel from "./components/UploadExcel";
import RandomStudentPicker from "./components/RandomStudentPicker";
import "./index.css";

function App() {
  const [students, setStudents] = useState<string[]>([]);

  const handleStudentsUpdate = (newStudents: string[]) => {
    setStudents(newStudents);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
      <div className="bg-gray-800 text-gray-200 rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-blue-500">
          Saityno Paslaugos
        </h1>
        <UploadExcel onStudentsUpdate={handleStudentsUpdate} />
        {students.length > 0 && <RandomStudentPicker students={students} />}
      </div>
    </div>
  );
}

export default App;
