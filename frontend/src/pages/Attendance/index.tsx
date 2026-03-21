import { useEffect, useState } from 'react';
import { studentService } from '../../services/studentService';
import { attendanceService } from '../../services/attendanceService';
import { Button } from '../../components/ui/Button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { format } from 'date-fns';

export function Attendance() {
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [students, setStudents] = useState<any[]>([]);
  const [records, setRecords] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        const studentData = await studentService.getStudents();
        setStudents(studentData);
        
        const defaultRecords: any = {};
        studentData.forEach((s: any) => {
          defaultRecords[s.id] = 'PRESENT';
        });
        setRecords(defaultRecords);
        
        const isoDate = new Date(date).toISOString();
        const existing = await attendanceService.getStudentAttendance(isoDate);
        existing.forEach((att: any) => {
          defaultRecords[att.studentId] = att.status;
        });
        setRecords({...defaultRecords});
      } catch(e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, [date]);

  const handleStatusChange = (studentId: string, status: string) => {
    setRecords(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const attendances = Object.entries(records).map(([studentId, status]) => ({
        studentId, status
      }));
      // Using a placeholder UUID for classId
      await attendanceService.bulkMarkStudent('cece394c-85a0-4ff6-99ff-43407981fb5f', new Date(date).toISOString(), attendances);
      alert('Attendance marked successfully!');
    } catch(e) {
      alert('Failed to save attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Attendance</h1>
        <div className="flex items-center gap-4">
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button onClick={handleSave} disabled={loading}>{loading ? 'Saving...' : 'Save Bulk Attendance'}</Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Class/Section</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
            ) : students.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center text-gray-500">No students found.</TableCell></TableRow>
            ) : (
              students.map(s => {
                const currentStatus = records[s.id] || 'PRESENT';
                return (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium text-gray-900">{s.user?.email}</TableCell>
                    <TableCell>{s.section?.name || 'Unassigned'}</TableCell>
                    <TableCell>
                      <div className="flex bg-gray-100 p-1 rounded-md w-fit box-border">
                        <button 
                          onClick={() => handleStatusChange(s.id, 'PRESENT')}
                          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${currentStatus === 'PRESENT' ? 'bg-green-500 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          Present
                        </button>
                        <button 
                          onClick={() => handleStatusChange(s.id, 'ABSENT')}
                          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${currentStatus === 'ABSENT' ? 'bg-red-500 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          Absent
                        </button>
                        <button 
                          onClick={() => handleStatusChange(s.id, 'LATE')}
                          className={`px-3 py-1 text-sm font-medium rounded transition-colors ${currentStatus === 'LATE' ? 'bg-yellow-500 text-white shadow' : 'text-gray-600 hover:text-gray-900'}`}
                        >
                          Late
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
