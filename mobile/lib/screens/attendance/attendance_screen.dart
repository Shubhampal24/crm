import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import '../../providers/auth_provider.dart';

class AttendanceScreen extends StatefulWidget {
  const AttendanceScreen({super.key});

  @override
  State<AttendanceScreen> createState() => _AttendanceScreenState();
}

class _AttendanceScreenState extends State<AttendanceScreen> {
  // Mock data for mobile view
  List<Map<String, dynamic>> students = [
    {'id': '1', 'name': 'John Doe', 'status': 'PRESENT'},
    {'id': '2', 'name': 'Jane Smith', 'status': 'ABSENT'},
    {'id': '3', 'name': 'Alice Johnson', 'status': 'PRESENT'},
  ];

  void _toggleStatus(int index, String status) {
    setState(() {
      students[index]['status'] = status;
    });
  }

  Future<void> _submitAttendance() async {
    // Scaffold submission logic
    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text('Attendance submitted to server!')),
    );
    if (mounted) Navigator.pop(context);
  }

  @override
  Widget build(BuildContext context) {
    final role = context.watch<AuthProvider>().role;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Attendance'),
        actions: [
          if (role == 'STAFF')
            IconButton(
              icon: const Icon(Icons.save),
              onPressed: _submitAttendance,
            )
        ],
      ),
      body: ListView.builder(
        itemCount: students.length,
        itemBuilder: (context, index) {
          final student = students[index];
          return Card(
            margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
            child: ListTile(
              title: Text(student['name'] as String),
              subtitle: Text('Status: ${student['status']}'),
              trailing: role == 'STAFF'
                  ? Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        IconButton(
                          icon: const Icon(Icons.check_circle, color: Colors.green),
                          onPressed: () => _toggleStatus(index, 'PRESENT'),
                        ),
                        IconButton(
                          icon: const Icon(Icons.cancel, color: Colors.red),
                          onPressed: () => _toggleStatus(index, 'ABSENT'),
                        ),
                        IconButton(
                          icon: const Icon(Icons.watch_later, color: Colors.orange),
                          onPressed: () => _toggleStatus(index, 'LATE'),
                        ),
                      ],
                    )
                  : Icon(
                      student['status'] == 'PRESENT' ? Icons.check_circle : Icons.cancel,
                      color: student['status'] == 'PRESENT' ? Colors.green : Colors.red,
                    ),
            ),
          );
        },
      ),
    );
  }
}
