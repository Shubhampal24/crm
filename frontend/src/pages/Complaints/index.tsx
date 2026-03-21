import { useState } from 'react';
import { Card, CardContent, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';

export function Complaints() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [complaints] = useState([
    { id: '1', subject: 'Library cooling not working', status: 'PENDING', date: '2026-03-18' },
    { id: '2', subject: 'Bus schedule delayed', status: 'RESOLVED', date: '2026-03-15' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Complaints & Requests</h1>
        <Button onClick={() => setIsModalOpen(true)}>Raise Complaint</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {complaints.map(c => (
          <Card key={c.id}>
            <CardHeader className="pb-3 text-sm flex-row justify-between items-center">
              <span className="text-gray-500">{c.date}</span>
              <Badge variant={c.status === 'RESOLVED' ? 'success' : 'warning'}>{c.status}</Badge>
            </CardHeader>
            <CardContent>
              <h3 className="font-semibold text-lg text-gray-900">{c.subject}</h3>
              <p className="text-gray-500 mt-2 text-sm line-clamp-2">This is a mock description of the complaint raised...</p>
              <Button variant="ghost" size="sm" className="mt-4 w-full">View Details</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Raise New Complaint">
        <form className="space-y-4">
          <Input label="Subject" required placeholder="Brief title" />
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea className="w-full h-32 rounded-md border border-gray-300 p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" required placeholder="Provide details..." />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button type="submit">Submit Complaint</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
