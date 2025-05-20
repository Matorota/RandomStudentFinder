import { useState } from "react";
import type { ChangeEvent } from "react";
import * as XLSX from "xlsx";

interface UploadExcelProps {
  onStudentsUpdate: (students: string[]) => void;
}

const UploadExcel: React.FC<UploadExcelProps> = ({ onStudentsUpdate }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if the file type is valid
      const validExtensions = [".xlsx", ".xls"];
      const fileName = file.name.toLowerCase();
      const isValidFile = validExtensions.some((ext) => fileName.endsWith(ext));

      if (!isValidFile) {
        setIsLoading(true); // Show "Kraunama..." message
        console.error("Invalid file type. Please upload an Excel file.");
        setTimeout(() => {
          setIsLoading(false); // Hide the message after 2 seconds
        }, 2000);
        return;
      }

      setIsLoading(true); // Start loading for valid files
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });

        const sheetName = workbook.SheetNames[1]; // Sheet 3 (zero-based index)
        if (!sheetName) {
          console.error("Sheet 3 does not exist in the workbook.");
          setIsLoading(false);
          return;
        }
        const sheet = workbook.Sheets[sheetName];
        const rows = XLSX.utils.sheet_to_json(sheet, {
          header: 1,
        }) as string[][];

        const headerRow = rows[2]; // Assuming the 3rd row contains the dates
        console.log("Header Row:", headerRow);

        let latestColumnIndex = -1;
        for (let col = headerRow.length - 1; col >= 0; col--) {
          const hasD = rows.some((row, rowIndex) => {
            if (rowIndex >= 3) {
              // Skip header rows
              return (
                typeof row[col] === "string" && row[col].toLowerCase() === "d"
              );
            }
            return false;
          });
          if (hasD) {
            latestColumnIndex = col;
            break;
          }
        }

        if (latestColumnIndex === -1) {
          console.error("No column with 'd' found.");
          setIsLoading(false);
          return;
        }

        console.log("Latest Column Index with 'd':", latestColumnIndex);

        const students = rows
          .slice(3) // Skip the first three rows (header rows)
          .filter((row) => {
            const value = row[latestColumnIndex];
            console.log("Row Value in Latest Column:", value); // Debug
            return typeof value === "string" && value.toLowerCase() === "d";
          })
          .map((row) => row[1]) // Extract the second column (student names)
          .filter(Boolean) as string[]; // Remove empty or undefined values

        console.log("Filtered Students:", students);
        onStudentsUpdate(students);
        setIsLoading(false);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <div className="text-center">
        <label className="block text-lg font-medium text-gray-200 mb-4">
          Įkelkite Excel failą su studentų sąrašu:
        </label>
        <input
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          className="block mx-auto w-full max-w-xs text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 transition"
        />
      </div>
      {isLoading && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="ml-2 text-blue-400 font-medium">Kraunama...</p>
        </div>
      )}
    </div>
  );
};

export default UploadExcel;
