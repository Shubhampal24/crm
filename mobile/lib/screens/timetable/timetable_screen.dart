import 'package:flutter/material.dart';

class TimetableScreen extends StatelessWidget {
  const TimetableScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final schedule = [
      {'time': '09:00 AM - 10:00 AM', 'subject': 'Mathematics'},
      {'time': '10:00 AM - 11:00 AM', 'subject': 'Physics'},
      {'time': '11:15 AM - 12:15 PM', 'subject': 'Chemistry'},
      {'time': '01:00 PM - 02:00 PM', 'subject': 'English Literature'},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Today\'s Timetable')),
      body: ListView.builder(
        padding: const EdgeInsets.all(16.0),
        itemCount: schedule.length,
        itemBuilder: (context, index) {
          final s = schedule[index];
          return Card(
            child: ListTile(
              leading: const Icon(Icons.access_time, color: Colors.blue),
              title: Text(s['subject']!, style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text(s['time']!),
            ),
          );
        },
      ),
    );
  }
}
