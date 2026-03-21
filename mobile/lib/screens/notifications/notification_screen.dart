import 'package:flutter/material.dart';

class NotificationScreen extends StatelessWidget {
  const NotificationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final notifications = [
      {'title': 'System Update', 'msg': 'Server maintenance at midnight', 'time': '1h ago', 'read': false},
      {'title': 'Attendance Alert', 'msg': 'Marked Absent today', 'time': '3h ago', 'read': true},
    ];

    return Scaffold(
      appBar: AppBar(title: const Text('Notifications')),
      body: ListView.builder(
        itemCount: notifications.length,
        itemBuilder: (context, index) {
          final n = notifications[index];
          return ListTile(
            leading: Icon(
              n['read'] == true ? Icons.notifications_none : Icons.notifications_active,
              color: n['read'] == true ? Colors.grey : Colors.blue,
            ),
            title: Text(n['title'] as String, style: TextStyle(fontWeight: n['read'] == true ? FontWeight.normal : FontWeight.bold)),
            subtitle: Text(n['msg'] as String),
            trailing: Text(n['time'] as String, style: const TextStyle(fontSize: 12, color: Colors.grey)),
          );
        },
      ),
    );
  }
}
