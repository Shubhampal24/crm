import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

export function Timetable() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const [view, setView] = useState('class');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Timetable</h1>
        <select 
          className="h-10 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={view}
          onChange={e => setView(e.target.value)}
        >
          <option value="class">Class View</option>
          <option value="teacher">Teacher View</option>
        </select>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="grid grid-cols-6 gap-4 min-w-[800px]">
              <div className="font-bold text-gray-500 pb-2 border-b">Time / Day</div>
              {days.map(day => (
                <div key={day} className="font-bold text-gray-900 pb-2 border-b text-center">{day}</div>
              ))}
              
              {/* Mock time slots */}
              {['09:00 - 10:00', '10:00 - 11:00', '11:15 - 12:15'].map(time => (
                <React.Fragment key={time}>
                  <div className="py-4 text-sm font-medium text-gray-500 flex items-center">{time}</div>
                  {days.map(day => (
                    <div key={`${day}-${time}`} className="p-3 rounded-md bg-blue-50 border border-blue-100 flex flex-col justify-center items-center h-24">
                      {/* Random mock blocks */}
                      {(Math.random() > 0.3) && (
                        <>
                          <span className="font-semibold text-blue-900 text-sm break-keep text-center">Mathematics</span>
                          <span className="text-xs text-blue-600 mt-1 text-center">Mr. Smith</span>
                        </>
                      )}
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
