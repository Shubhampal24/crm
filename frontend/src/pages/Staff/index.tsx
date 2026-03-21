import React, { useEffect, useState } from 'react';
import { staffService } from '../../services/staffService';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import { Badge } from '../../components/ui/Badge';
import { Search, Plus } from 'lucide-react';

export function Staff() {
  const [staff, setStaff] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loadStaff = async () => {
    try {
      const data = await staffService.getStaff();
      setStaff(data);
    } catch(e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStaff();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await staffService.createStaff({ email, password });
      setIsModalOpen(false);
      setEmail('');
      setPassword('');
      loadStaff();
    } catch (e) {
      alert("Failed to create staff");
    }
  };

  const filteredStaff = staff.filter(s => 
    s.user?.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Staff Management</h1>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              placeholder="Search staff..."
              className="w-full h-10 pl-9 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <Button onClick={() => setIsModalOpen(true)} className="shrink-0 gap-2">
            <Plus size={16} /> Add Staff
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Subjects</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow><TableCell colSpan={3} className="text-center">Loading...</TableCell></TableRow>
            ) : filteredStaff.length === 0 ? (
              <TableRow><TableCell colSpan={3} className="text-center text-gray-500">No staff found.</TableCell></TableRow>
            ) : (
              filteredStaff.map(s => (
                <TableRow key={s.id}>
                  <TableCell className="font-medium text-gray-900">{s.user?.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {s.subjects?.length > 0 ? s.subjects.map((sub: any) => (
                        <Badge key={sub.id} variant="default">{sub.name}</Badge>
                      )) : <span className="text-gray-400 text-sm">None</span>}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button variant="secondary" size="sm">Manage Subjects</Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Staff">
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
            <Button type="submit">Create Staff</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
