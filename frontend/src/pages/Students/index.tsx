import React, { useEffect, useState } from 'react';
import { studentService } from '../../services/studentService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus, Trash2 } from 'lucide-react';

export function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Add form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadStudents = async () => {
    try {
      const data = await studentService.getStudents();
      setStudents(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await studentService.createStudent({ email, password });
      setIsModalOpen(false);
      setEmail('');
      setPassword('');
      loadStudents();
    } catch (e) {
      alert('Failed to add student');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete student?')) return;
    try {
      await studentService.deleteStudent(id);
      loadStudents();
    } catch (e) {
      alert('Failed to delete');
    }
  };

  const filteredStudents = students.filter(s => 
    s.user?.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Students</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search students..."
              className="w-full h-10 pl-9 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shrink-0 gap-2">
            <Plus size={16} /> Add Student
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Class/Section</TableHead>
              <TableHead>Parent Linked</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={4} className="text-center">Loading...</TableCell></TableRow>
            ) : filteredStudents.length === 0 ? (
              <TableRow><TableCell colSpan={4} className="text-center text-gray-500">No students found.</TableCell></TableRow>
            ) : (
              filteredStudents.map(student => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium text-gray-900">{student.user?.email}</TableCell>
                  <TableCell>{student.section?.name || 'Unassigned'}</TableCell>
                  <TableCell>
                    {student.parent ? (
                      <Badge variant="success">Yes</Badge>
                    ) : (
                      <Badge variant="warning">No</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(student.id)} title="Delete">
                      <Trash2 size={16} className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Student">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input 
            label="Email Address" 
            type="email" 
            required 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
          />
          <Input 
            label="Default Password" 
            type="password" 
            required 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
          />
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Create Student</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
